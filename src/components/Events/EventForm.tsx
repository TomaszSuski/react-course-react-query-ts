import { useState } from "react";

import ImagePicker from "../ImagePicker";

export interface FormDataTypes {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

export interface EventFormProps {
  inputData?: FormDataTypes | null;
  onSubmit: (data: FormDataTypes) => void;
  children: React.ReactNode;
}

export default function EventForm({
  inputData,
  onSubmit,
  children,
}: EventFormProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    inputData?.image ?? ""
  );

  function handleSelectImage(image: string) {
    setSelectedImage(image);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data: FormDataTypes = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      location: formData.get("location") as string,
      image: selectedImage,
    };

    onSubmit({ ...data, image: selectedImage });
  }

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ""}
        />
      </p>

      <div className="control">
        <ImagePicker
          images={[]}
          onSelect={handleSelectImage}
          selectedImage={selectedImage}
        />
      </div>

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ""}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ""}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ""}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ""}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}
