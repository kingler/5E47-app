import type { DomainEvent, EventName } from "./types";

// In-process event bus stub. In production this fronts an event log
// (NATS / Kafka / Postgres LISTEN) that fans out to workflows, analytics,
// notifications, and AI processors.

type Listener<T = unknown> = (event: DomainEvent<T>) => void | Promise<void>;

class EventBus {
  private listeners = new Map<EventName, Set<Listener>>();
  private log: DomainEvent[] = [];

  on<T>(type: EventName, listener: Listener<T>) {
    const set = this.listeners.get(type) ?? new Set();
    set.add(listener as Listener);
    this.listeners.set(type, set);
    return () => set.delete(listener as Listener);
  }

  emit<T>(type: EventName, payload: T, actorId?: string): DomainEvent<T> {
    const event: DomainEvent<T> = {
      id: `evt_${Math.random().toString(36).slice(2, 10)}`,
      type,
      at: new Date().toISOString(),
      actorId,
      payload,
    };
    this.log.unshift(event);
    if (this.log.length > 500) this.log.pop();
    const set = this.listeners.get(type);
    if (set) {
      for (const l of set) {
        Promise.resolve(l(event)).catch(() => undefined);
      }
    }
    return event;
  }

  recent(limit = 25): DomainEvent[] {
    return this.log.slice(0, limit);
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __5e47_bus: EventBus | undefined;
}

export const bus: EventBus = globalThis.__5e47_bus ?? new EventBus();
if (!globalThis.__5e47_bus) globalThis.__5e47_bus = bus;
