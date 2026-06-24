import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";
// import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);
  async function handleSubmit(prevFormState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];
    if (!userName.trim()) {
      errors.push("Please enter a valid username!");
    }
    if (!title.trim()) {
      errors.push("Please enter a valid post title!");
    }
    if (!body.trim()) {
      errors.push("Please enter a valid post body!");
    }
    if (errors.length > 0) {
      return {
        errors,
        entredValues: {
          userName,
          title,
          body,
        },
      };
    }
    await addOpinion({ userName, title, body });
    return {
      errors: null,
    };
  }
  const [formState, formAction, pending] = useActionState(handleSubmit, {
    errors: null,
  });

  console.log(formState);
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.entredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.entredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.entredValues?.body}
          ></textarea>
        </p>
        <p className="actions">
          <button type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
          </button>
        </p>
      </form>
      {formState.errors && (
        <ul>
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
