// ТЕСТОВЫЙ КОМПОНЕНТ ДЛЯ ПРАКТИКИ С MENTIONS JS + DRAFT JS 


// import React, {
//   ReactElement,
//   useMemo,
//   useRef,
//   useState,
//   useCallback,
// } from "react";
// import { Link } from "react-router-dom";
// import { EditorState, RichUtils } from "draft-js";
// import Editor from "@draft-js-plugins/editor";
// import createMentionPlugin, {
//   defaultSuggestionsFilter,
// } from "@draft-js-plugins/mention";
// import createHashtagPlugin from "@draft-js-plugins/hashtag";
// import editorStyles from "./MultiMentionTriggers.module.css";
// import hashtagStyles from "./hashtagStyles.module.css";
// // работает упоминания и хештеги
// import mentionsStyles from "./MentionsStyles.module.css";


// const mentions = [
//   {
//     name: "Matthew Russell",
//     link: "https://hp18.ru/v8mzb",
//   },
//   {
//     name: "Julian Krispel-Samsel",
//     link: "https://twitter.com/juliandoesstuff",
//   },
// ];

// const mentions2 = [
//   {
//     name: "Проект Аврора",
//     value: "Пункт Приема цветного металла",
//   },
//   {
//     name: "Проект Западный Техас",
//     value: "Пункт назначения",
//   },
// ];

// const createHighlightPlugin = () => {
//   return {
//     customStyleMap: {
//       HIGHLIGHT: {
//         background: "#fffe0d",
//       },
//     },
//     keyBindingFn: (e) => {
//       if (e.metaKey && e.key === "h") {
//         return "highlight";
//       }
//     },
//     handleKeyCommand: (command, editorState, { setEditorState }) => {
//       if (command === "highlight") {
//         setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
//         return true;
//       }
//     },
//   };
// };
// function Entry(props) {
//   const { mention, theme, searchValue, isFocused, ...parentProps } = props;
//   // console.log(props, "props");
//   return (
//     // добавить свои классы вместо parent props
//     <div {...parentProps}>
//       {/* <h2>{mention.name}</h2> */}
//       <div className={theme?.mentionSuggestionsEntryContainer}>
//         <div className={theme?.mentionSuggestionsEntryContainerRight}>
//           <div className={theme?.mentionSuggestionsEntryText}>
//             {mention.name}
//           </div>

//           <div className={theme?.mentionSuggestionsEntryTitle}>
//             {mention.title}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// const highlightPlugin = createHighlightPlugin();



// const MentionComponent = ({ mention, children, className }) => {
//   // console.log(mention);
//   //  по идее должно работать так, сейчас не рабоает -  не настроен роутинг
//   return (
//     // <Link to={mention.link}>
//     //   <span className={className} spellCheck={false} data-role-id={mention.id}>
//     //     {children}
//     //   </span>
//     // </Link>

//     <span className={className} spellCheck={false} data-role-id={mention.id}>
//       {children}
//     </span>
//   );
// };

// const MentionMulty = () => {
//   const ref = useRef(null);
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [open, setOpen] = useState(false);
//   const [suggestions, setSuggestions] = useState(mentions);
//   const [someComponent, setSomeComponent] = useState(null);
//   const hashtagPlugin = createHashtagPlugin({ theme: hashtagStyles });

//   const { MentionSuggestions, plugins } = useMemo(() => {
//     const mentionPlugin = createMentionPlugin({
//       entityMutability: "IMMUTABLE",
//       theme: mentionsStyles,
//       // mentionPrefix: "@",
//       mentionTrigger: ["@", "&"],
//       supportWhitespace: true,
//       mentionComponent: MentionComponent,
//     });
//     // eslint-disable-next-line no-shadow
//     const { MentionSuggestions } = mentionPlugin;
//     // eslint-disable-next-line no-shadow
//     const plugins = [mentionPlugin, highlightPlugin, hashtagPlugin];
//     return { plugins, MentionSuggestions };
//   }, []);

//   const onChange = useCallback((_editorState) => {
//     setEditorState(_editorState);
//   }, []);

//   // для списка по упоминаниям
//   const onOpenChange = useCallback((_open) => {
//     setOpen(_open);
//   }, []);

//   // вид упоминаний
//   const onSearchChange = useCallback(({ trigger, value }) => {
//     console.log(trigger);
//     if (trigger === "@") {
//       setSuggestions(defaultSuggestionsFilter(value, mentions, trigger));
//     } else {
//       setSuggestions(defaultSuggestionsFilter(value, mentions2, trigger));
//     }
//   }, []);

//   // что то связанное с клавиатурой и выделением текста
//   const handleKeyCommand = (command) => {
//     const newState = RichUtils.handleKeyCommand(
//       this.state.editorState,
//       command
//     );
//     if (newState) {
//       this.onChange(newState);
//       return "handled";
//     }
//     return "not-handled";
//   };

//   const onBoldClick = () => {
//     onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
//   };
//   const onUnderlineClick = () => {
//     onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
//   };

//   const getSelectedText = () => {
//     setSomeComponent(window.getSelection().toString());
//   };
//   return (
//     <>
//       <div>
//         <p
//           onMouseUp={() => {
//             getSelectedText();
//           }}
//         >
//           {" "}
//           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
//           inventore! Eveniet similique, voluptatibus quo quos tempore facere
//           adipisci inventore, possimus repellat hic id illum reprehenderit,
//           praesentium accusantium dolorum fugiat labore! Optio autem ipsa, iure
//           fugit commodi saepe voluptas nulla harum inventore ex odio deserunt
//           deleniti itaque possimus ducimus quam vero repudiandae at, molestias
//           blanditiis sunt dicta debitis! Velit, laboriosam esse! Earum,
//           deleniti. Placeat eum doloribus, rerum accusantium eius est mollitia
//           laboriosam earum doloremque molestias deleniti pariatur, ipsa velit
//           vero eos sequi veniam, aperiam culpa officiis animi debitis
//           repudiandae voluptates? Architecto.
//         </p>

//         <button className="bold" onClick={onBoldClick}>
//           <b>B</b>
//         </button>
//         <button className="underline" onClick={onUnderlineClick}>
//           U
//         </button>
//         {/* <button className="underline" onClick={onUnderlineClick}>
//           U
//         </button>
//         <button className="bold" onClick={onBoldClick}>
//           <b>B</b>
//         </button>
//         <button className="italic" onClick={onItalicClick}>
//           <em>I</em>
//         </button>
//         <button className="strikethrough" onClick={onStrikeThroughClick}>
//           abc
//         </button>
//         <button className="highlight" onClick={onHighlight}>
//           <span style={{ background: "yellow", padding: "0.3em" }}>H</span>
//         </button> */}
//         <div
//           // className="editors"
//           className={editorStyles.editor}
//           onClick={() => {
//             ref.current.focus();
//           }}
//         >
//           {someComponent && <p>{someComponent}</p>}
//           <Editor
//             editorState={editorState}
//             onChange={onChange}
//             ref={ref}
//             // handleKeyCommand={handleKeyCommand}

//             plugins={plugins}
//           />

//           <MentionSuggestions
//             open={open}
//             onOpenChange={onOpenChange}
//             onSearchChange={onSearchChange}
//             suggestions={suggestions}
//             onAddMention={() => {
//               // console.log("onAddMention");
//             }}
//             entryComponent={Entry}
//             popoverContainer={({ children }) => <div>{children} </div>}
//           />
//         </div>
//       </div>
   
//     </>
//   );
// };

// export default MentionMulty;
