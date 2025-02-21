/* eslint-disable react/prop-types */
import parse from "html-react-parser";
const ChatlogAI = ({ message }) => {
  function formatResponse(rawText) {
    let formattedText = rawText
        .replace(/\*\*(.*?)\*\*/g, "<h2>$1</h2>") // Convert **text** to <h2> (headings)
        .replace(/\n\n/g, "<br><br>") // Add line breaks
        .replace(/\* (.*?)\n/g, "<li>$1</li>") // Convert * bullet points to <li>
        .replace(/(<li>.*?<\/li>)/g, "<ul>$1</ul>"); // Wrap list items in <ul>

    return formattedText
}

  const formattedMessage = formatResponse(message.message); // Call the formatting function
  const parsedMessage = parse(formattedMessage);

  return (
    <>
      <div
        className={`chatlog ${
          message.user === "Medvisor" ? "flex text-gray-50" : ""
        } mb-3 mt-6`}
      >
        <div
          className={`chat-message ${
            message.user === "Medvisor"
              ? "mt-8 bg-gray-900 border-zinc-600 rounded-xl"
              : "mt-8 border-zinc-600 rounded-xl"
          }`}
        >
          <div className="avatar text-sm font-bold px-2 pt-2 ">
            {message.user}
          </div>
          <div className="message px-2 py-1 pb-2 mb-2">{parsedMessage}</div>
        </div>
      </div>
    </>
  );
};
export default ChatlogAI;
