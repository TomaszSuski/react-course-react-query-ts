import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem, { Event } from "./EventItem";
import { fetchEvents, ErrorElement } from "../../util/http";

export default function NewEventsSection() {
  // useQuery konfiguruje się przekazując obiekt z kluczami:
  // queryKey - tablica z kluczami, które będą użyte do identyfikacji zapytania dla kaszowania danych - obowiązkowe!
  // queryFn - funkcja, która zostanie wykonana w celu pobrania danych - zazwyczaj funkcja requestu, ale jedyne obostrzenie to zwracanie promise przez nią
  // staleTime - czas, po którym dane zostaną pobrane ponownie
  // refetchOnWindowFocus - czy dane mają być pobierane ponownie po powrocie do okna przeglądarki
  // refetchOnMount - czy dane mają być pobierane ponownie po zamontowaniu komponentu
  // refetchInterval - czas, po którym dane mają być pobierane ponownie
  // refetchIntervalInBackground - czy dane mają być pobierane ponownie w tle
  // refetchIntervalInBackgroundDelay - czas, po którym dane mają być pobierane ponownie w tle
  // retry - liczba prób pobrania danych w przypadku błędu
  // retryDelay - czas, po którym kolejna próba pobrania danych zostanie wykonana
  // onError - funkcja, która zostanie wykonana w przypadku błędu
  // onSuccess - funkcja, która zostanie wykonana w przypadku sukcesu
  // onSettled - funkcja, która zostanie wykonana po zakończeniu zapytania
  // enabled - czy zapytanie ma być wykonane
  // initialData - dane początkowe
  // initialStale - czy dane początkowe mają być uznane za nieaktualne
  // suspense - czy komponent ma być zawieszony w przypadku braku danych
  // useErrorBoundary - czy komponent ma być zawieszony w przypadku błędu
  // notifyOnChangeProps - tablica z kluczami, które mają być użyte do identyfikacji zapytania

  // Ważne! tanstack query nie ma własnej logiki do wykonywania requestów, dlatego musimy sami zaimplementować funkcję, która będzie pobierała dane
  // ta biblioteka służy do zarządzania stanem zapytań, a nie do ich wykonywania, kaszowania itp.
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  }) as {
    data: Event[];
    isPending: boolean;
    isError: boolean;
    error: ErrorElement;
  };

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError && error) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Could not fetch events"}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
