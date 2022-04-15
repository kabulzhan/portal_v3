import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  EditorState,
  RichUtils,
  ContentState,
  convertFromHTML,
} from "draft-js";
import Editor from "@draft-js-plugins/editor";

import editorStyles from "./MultiMentionTriggers.module.css";
import "./textEditor.css";
import { stateToHTML } from "draft-js-export-html";

const createHighlightPlugin = () => {
  return {
    customStyleMap: {
      HIGHLIGHT: {
        background: "#fffe0d",
      },
    },
    keyBindingFn: (e) => {
      if (e.metaKey && e.key === "h") {
        return "highlight";
      }
    },
    handleKeyCommand: (command, editorState, { setEditorState }) => {
      if (command === "highlight") {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
        return true;
      }
    },
  };
};

const highlightPlugin = createHighlightPlugin();

const TextEditor = (props) => {
  const ref = useRef(null);
  const [toolbar, setToolBar] = useState(false);
  const {
    prev,
    onSubmitFiles 
  } = props; // предыдущее значение поля
  const initPrevState = () => {
    let prevState = convertFromHTML(prev);
    // const content = ContentState.createFromText(test);
    const content = ContentState.createFromBlockArray(
      prevState.contentBlocks,
      prevState.entityMap
    );
    return content;
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    // если у нас нет prev - тогда отрабатывает useeffect для  создания модалки
    if (!prev) {
      return;
    }
    setEditorState(EditorState.createWithContent(initPrevState()));
    // console.log(prev, " init state in text editor ");
  }, [prev]);

  const { plugins } = useMemo(() => {
    // eslint-disable-next-line no-shadow
    const plugins = [highlightPlugin];
    return { plugins };
  }, []);

  const onChange = useCallback((_editorState) => {
    setEditorState(_editorState);
  }, []);

  // что то связанное с клавиатурой и выделением текста
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  // при отпускании когда загружаем файлыи или  при  выборе из диалога
  // const onSubmitFiles = (e) => {
  //   e.preventDefault();
  //   // setDrag(false);
  //   let files = e.target.files ? e.target.files : [...e?.dataTransfer?.files];
  //   // отправляем данные при загрузке в родителя ProjectFormCreateEditBody
  //   addFiles([...files].map((x) => x.name));
  //   // задаем имя с id в конце имени (для сервера)  test.doc = test_1646143921028.doc.
  //   const addFileNameId = (file) => {
  //     let arr = file.name.split(".");
  //     let newFileName = arr[0] + "_" + Date.now() + "." + arr[arr.length - 1];
  //     return newFileName;
  //   };

  //   const formData = new FormData();
  //   for (const file of files) {
  //     // задаем уникальное имя, отправляя его же родителю для хранения коллекции загруженных файлов
  //     let uniqueName = addFileNameId(file);
  //     formData.append("files", file, uniqueName);
  //   }
  //   formData.append("form_id", formId);
  //   // если редактируем проект, нужно указать project_id
  //   if (projectId) {
  //     formData.append("project_id", projectId);
  //   }

  //   axios
  //     .post(url_post_add_files, formData, {
  //       headers: {
  //         Authorization: auth.token,
  //       },
  //     })
  //     .then(
  //       (res) => console.log(res, "file was downloaded"),

  //       (err) => {
  //         console.log(err, "error");
  //       }
  //     );
  //   // .then();
  // };

  return (
    <>
      {toolbar && (
        <div className="toolbar">
          <div className="toolbar__item bold" onClick={onBoldClick}>
            <b>B</b>
          </div>
          <div className="toolbar__item underline" onClick={onUnderlineClick}>
            U
          </div>
        </div>
      )}

      <div className="modal__row">
        <div
          className={editorStyles.editor}
          onClick={() => {
            ref.current.focus();
          }}
          onBlur={() => {
            props.sendFormat(stateToHTML(editorState.getCurrentContent()));
          }}
        >
          <Editor
            editorState={editorState}
            // blockStyleFn={myBlockStyleFn}
            onChange={onChange}
            ref={ref}
            // handleKeyCommand={handleKeyCommand}
            plugins={plugins}
            // id={name}
            rows="2"
            style={{ height: props.height }}
          />
          <div className="modal__controls-box">
            <div
              onClick={() => {
                setToolBar((prev) => !prev);
              }}
              className="modal__controls modal__controls--richtext"
            ></div>

            {/* иконка открытия диалога выбора файлов */}
            <div className="modal__controls modal__controls--attach">
             <input
              type="file"
              className="modal__controls modal__controls--attach"
              id="upload"
              multiple="multiple"
              onChange={(e)=>  onSubmitFiles(e)}
            />
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default TextEditor;
