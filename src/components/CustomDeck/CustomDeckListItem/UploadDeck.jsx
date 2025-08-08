import Ajv from "ajv";
import { useContext } from "react";
import { GameContext } from "../../../GameContext";

const UploadDeck = () => {
  const { setCustomDeck, setCustomDeckName } = useContext(GameContext);

  // Set up JSON validator
  const ajv = new Ajv({ strict: false });

  const objectSchema = {
    type: "object",
    properties: {
      id: { type: "integer" },
      promptText: { type: "string", maxLength: 130 },
    },
    required: ["id", "promptText"],
    additionalProperties: false,
  };

  const arraySchema = {
    type: "array",
    items: objectSchema,
    minItems: 1,
    maxItems: 1000,
  };

  const validate = ajv.compile(arraySchema);

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/FileReader
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    // Validate file size
    const maxFileSize = 50000;
    if (file.size > maxFileSize) {
      alert(
        "File size is " +
          file.size / 1000 +
          " KB. Maximum file size is " +
          maxFileSize / 1000 +
          " KB."
      );
      return;
    }

    // Validate that uploaded file is JSON type
    if (file.type !== "application/json") {
      alert("File type is " + file.type + ". Please upload a valid JSON file.");
      return;
    }

    // Validate filename length
    const maxFileName = 30;
    if (file.name.length > maxFileName) {
      alert(
        "Filename is " +
          file.name.length +
          " characters. Please limit filename to " +
          maxFileName +
          " characters."
      );
      return;
    }

    // After file has passed initial validations, read file
    const reader = new FileReader();
    reader.onload = (event) => {
      const customDeckArray = JSON.parse(event.target.result);
      // Validate JSON schema
      if (!validate(customDeckArray)) {
        alert("Error: " + validate.errors[0].message);
        return;
      }

      // Rebuild customDeckArray to clean up id's
      let customDeckArrayRebuilt = [];
      for (const [index, prompt] of customDeckArray.entries()) {
        customDeckArrayRebuilt.push({
          id: index + 1,
          promptText: prompt.promptText,
        });
      }

      // Set state customDeck to rebuilt array
      setCustomDeck(customDeckArrayRebuilt);
      // Set LS customDeck to rebuilt array
      localStorage.setItem(
        "customDeck",
        JSON.stringify(customDeckArrayRebuilt)
      );

      // Set state customDeckName to filename
      setCustomDeckName(file.name.replace(".json", ""));
      // Set LS customDeckName to filename
      localStorage.setItem("customDeckName", file.name.replace(".json", ""));

      // Set LS nextId
      localStorage.setItem("nextId", customDeckArrayRebuilt.length + 1);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <button style={{ padding: "10px 0px" }}>
        <label htmlFor="deck-file-input" style={{ padding: "20px 10px" }}>
          Upload
        </label>
      </button>
      <input
        id="deck-file-input"
        type="file"
        accept=".json"
        onChange={handleFileUpload}
      ></input>
    </>
  );
};

export default UploadDeck;
