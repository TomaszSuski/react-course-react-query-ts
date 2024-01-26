interface Errorinfo extends Object {
    message: string;
  }

export interface ErrorElement extends Error {
    info?: Errorinfo;
    code?: number;
  }

export async function fetchEvents() {
  const response = await fetch("http://localhost:3000/events");

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the events"
    ) as ErrorElement;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}
