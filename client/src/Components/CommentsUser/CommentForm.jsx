import React, { useState } from "react";
import { createComment } from "../../Redux/Slices/Comments/commentsAction";
import { useDispatch, useSelector } from "react-redux";

export const CommentForm = ({
    idposts,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialText = "",
}) => {
    const user = useSelector((state) => state.sessionState?.user);
    const dispatch = useDispatch();
    const [text, setText] = useState(initialText);
    const isTextareaDisabled = text.length === 0;
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            createComment({
                body: text,
                date: new Date(),
                user: user.firstName,
                postId: idposts,
            })
        );

        setText("");
        window.location.reload(true);
    };
    const handleChange = (e) => {
        e.preventDefault();
        setText(e.target.value);
    };
    // const onSubmit = (event) => {
    //   event.preventDefault();
    //   setText("");
    // };
    return (
        <div class="flex mx-auto items-center justify-center shadow-lg  max-w-lg w-screen ml-15">
            <React.Fragment>
                {showForm ? (
                    <form onSubmit={handleSubmit}>
                        <label for="chat" class="sr-only">
                            Your message
                        </label>
                        <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <textarea
                                id="chat"
                                rows="1"
                                class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Escribe tu comentario..."
                                value={text}
                                onChange={handleChange}
                            ></textarea>
                            <button
                                type="submit"
                                class="inline-flex justify-center p-2 text-slate-300 rounded-full cursor-pointer hover:bg-customGray dark:text-slate-300 dark:hover:bg-gray-800 w-96"
                                disabled={isTextareaDisabled}
                            >
                                {" "}
                                {submitLabel}
                                <svg
                                    aria-hidden="true"
                                    class="w-6 h-6 rotate-90"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                                <span
                                    class="sr-only"
                                    onClick={() => setShowForm(true)}
                                >
                                    Comentar
                                </span>
                            </button>
                        </div>
                    </form>
                ) : (
                    <a href="#_" class="relative px-6 py-3 font-bold text-black group">
                    <span class="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-customRed group-hover:translate-x-0 group-hover:translate-y-0" onClick={() => setShowForm(true)}></span>
                    <span class="absolute inset-0 w-full h-full border-4 border-black"></span>
                    <span class="relative"onClick={() => setShowForm(true)}>Comenta!</span>
                    </a>
                  
                )}
            </React.Fragment>
        </div>
    );
};

export default CommentForm;
