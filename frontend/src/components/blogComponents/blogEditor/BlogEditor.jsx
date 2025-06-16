import { useState, useEffect, useRef } from "react"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, ListOrdered, List, ImageIcon, Link, Video, Table, Code, Strikethrough, ChevronLeft, ChevronRight, Clipboard } from 'lucide-react'
import SelectionManager from "../../../utils/SelectionManager"
import applyStyleToSelection from "../../../utils/applyStyleToSelection"
import SlideshowManager from "../../../utils/SlideshowManager"
import "./BlogEditor.css"

const BlogEditor = ({ onSave, initialContent = "" }) => {
  console.log(initialContent)
  const [content, setContent] = useState(initialContent)
  const [selectedText, setSelectedText] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [showImageInput, setShowImageInput] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [showVideoInput, setShowVideoInput] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")
  const [showFontSizeInput, setShowFontSizeInput] = useState(false)
  const [fontSize, setFontSize] = useState("16")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [color, setColor] = useState("#000000")
  const [showTableInput, setShowTableInput] = useState(false)
  const [tableRows, setTableRows] = useState(2)
  const [tableCols, setTableCols] = useState(2)
  const [showSizeDialog, setShowSizeDialog] = useState(false)
  const [sizeDialogPosition, setSizeDialogPosition] = useState({ x: 0, y: 0 })
  const [currentElement, setCurrentElement] = useState(null)
  const [sizeValue, setSizeValue] = useState(100)
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 })
  const [multipleImages, setMultipleImages] = useState([])

  const editorRef = useRef(null)
  const selectionManagerRef = useRef(new SelectionManager())
  const slideshowManagerRef = useRef(new SlideshowManager())
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent || '';
      // Initialize all slideshows after content is loaded
      setTimeout(() => {
        slideshowManagerRef.current.initializeAllSlideshows(editorRef.current);
      }, 100);
    }
  }, [initialContent]);

  // Re-initialize slideshows whenever content changes
  useEffect(() => {
    if (editorRef.current) {
      setTimeout(() => {
        slideshowManagerRef.current.initializeAllSlideshows(editorRef.current);
      }, 100);
    }
  }, [content]);

  // Auto-save selection when it changes
  const handleTextSelection = (e) => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString())
      selectionManagerRef.current.saveSelection()
    }
  }

  function findAncestor(el, tagName) {
    while (el && el.nodeType === 1) {
      if (el.tagName === tagName) return el;
      el = el.parentNode;
    }
    return null;
  }

  const handleEditorKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const container = range.startContainer;

      const preElement = container.closest ? container.closest("pre") : findAncestor(container, "PRE");

      if (preElement) {
        e.preventDefault();

        const p = document.createElement("p");
        p.innerHTML = "<br>";

        preElement.parentNode.insertBefore(p, preElement.nextSibling);

        const newRange = document.createRange();
        newRange.setStart(p, 0);
        newRange.collapse(true);

        selection.removeAllRanges();
        selection.addRange(newRange);

        editorRef.current.focus();
      }
    }
  };

  const handleInputFocus = (inputType) => {
    const hasSelection = selectionManagerRef.current.saveSelection()

    switch (inputType) {
      case "fontSize":
        setShowFontSizeInput(prev => !prev)
        break
      case "color":
        setShowColorPicker(prev => !prev)
        break
      case "link":
        setShowLinkInput(prev => !prev)
        break
      case "image":
        setShowImageInput(prev => !prev)
        break
      case "video":
        setShowVideoInput(prev => !prev)
        break
      case "table":
        setShowTableInput(prev => !prev)
        break
      default:
        break
    }
  }

  // Enhanced function to apply styles with selection restoration
  const applyStyleWithSelection = (styleCallback) => {
    // First try to restore saved selection
    const restored = selectionManagerRef.current.restoreSelection()

    if (restored || selectionManagerRef.current.hasCurrentSelection()) {
      applyStyleToSelection(styleCallback)
    } else {
      applyStyleToSelection(styleCallback)
    }

    selectionManagerRef.current.clearSelection()

    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const executeCommand = (command, value = null) => {
    selectionManagerRef.current.restoreSelection()

    document.execCommand(command, false, value)

    if (editorRef.current) {
      editorRef.current.focus()
    }

    selectionManagerRef.current.clearSelection()
  }

  const handleBold = (e) => {
    e.preventDefault()
    executeCommand("bold")
  }

  const handleItalic = (e) => {
    e.preventDefault()
    executeCommand("italic")
  }

  const handleUnderline = (e) => {
    e.preventDefault()
    executeCommand("underline")
  }

  const handleStrikethrough = (e) => {
    e.preventDefault()
    executeCommand("strikethrough")
  }

  const handleAlign = (alignment) => {
    executeCommand("justify" + alignment)
  }

  const handleFontSizeChange = (e) => {
    e.preventDefault()

    applyStyleWithSelection((el) => {
      el.style.fontSize = fontSize + "px"
    })

    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }

    setShowFontSizeInput(false)
  }

  const handleColor = (e) => {
    e.preventDefault()

    selectionManagerRef.current.restoreSelection()
    document.execCommand("foreColor", false, color)

    if (editorRef.current) {
      editorRef.current.focus()
    }

    selectionManagerRef.current.clearSelection()
    setShowColorPicker(false)
  }

  const handleLinkInsert = (e) => {
    e.preventDefault()

    selectionManagerRef.current.restoreSelection()

    if (linkUrl) {
      const linkHtml = `<a href="${linkUrl}" target="_blank">${linkText || linkUrl}</a>`
      document.execCommand("insertHTML", false, linkHtml)
      setShowLinkInput(false)
      setLinkUrl("")
      setLinkText("")
    }

    selectionManagerRef.current.clearSelection()

    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const handleImageInsert = (e) => {
    e.preventDefault()

    selectionManagerRef.current.restoreSelection()

    if (imageUrl) {
      const imgHtml = `<img src="${imageUrl}" alt="${imageAlt}" style="width: 600px;" />`
      document.execCommand("insertHTML", false, imgHtml)
      setShowImageInput(false)
      setImageUrl("")
      setImageAlt("")
    }

    selectionManagerRef.current.clearSelection()

    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const handleVideoInsert = (e) => {
    e.preventDefault()

    selectionManagerRef.current.restoreSelection()

    if (videoUrl) {
      let embedUrl = videoUrl

      if (videoUrl.includes("youtube.com/watch")) {
        const videoId = new URL(videoUrl).searchParams.get("v")
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`
      }

      if (videoUrl.includes("youtu.be/")) {
        const videoId = new URL(videoUrl).pathname.substring(1)
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`
      }

      const videoHtml = `</br><div class="video-container" contenteditable="false"><iframe style="width: 560px; height: 315px;" src="${embedUrl}" frameborder="0" allowfullscreen></iframe></div></br>`
      document.execCommand("insertHTML", false, videoHtml)
      setShowVideoInput(false)
      setVideoUrl("")
    }

    selectionManagerRef.current.clearSelection()

    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const handleTableInsert = (e) => {
    e.preventDefault()

    selectionManagerRef.current.restoreSelection()

    let tableHtml = '<table border="1" style="width:100%;border-collapse:collapse;">'

    tableHtml += "<thead><tr>"
    for (let i = 0; i < tableCols; i++) {
      tableHtml += `<th style="border:1px solid #ccc;padding:8px;">Header ${i + 1}</th>`
    }
    tableHtml += "</tr></thead><tbody>"

    for (let i = 0; i < tableRows - 1; i++) {
      tableHtml += "<tr>"
      for (let j = 0; j < tableCols; j++) {
        tableHtml += `<td style="border:1px solid #ccc;padding:8px;">Cell ${i + 1},${j + 1}</td>`
      }
      tableHtml += "</tr>"
    }

    tableHtml += "</tbody></table>"

    document.execCommand("insertHTML", false, tableHtml)
    setShowTableInput(false)

    selectionManagerRef.current.clearSelection()

    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const handleOrderedList = (e) => {
    e.preventDefault()
    executeCommand("insertOrderedList")
  }

  const handleUnorderedList = (e) => {
    e.preventDefault()
    executeCommand("insertUnorderedList")
  }

  const handleCodeInsert = (e) => {
    e.preventDefault()

    selectionManagerRef.current.restoreSelection()

    const codeHtml = `<pre style="position: relative;"><code>${"Add your code here"}</code><div contenteditable="false" style="position: absolute; right: 0; top: 0; margin: 8px; cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-icon lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg></div></pre>`
    document.execCommand("insertHTML", false, codeHtml)
    selectionManagerRef.current.clearSelection()

    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const handleContentChange = (e) => {
    setContent(e.target.innerHTML)
  }

  const handleSave = (e) => {
    e.preventDefault();
    console.log("OnSave: ",content)
    onSave(content);
  }

  const closePopup = (popupType) => {
    switch (popupType) {
      case "fontSize":
        setShowFontSizeInput(false)
        break
      case "color":
        setShowColorPicker(false)
        break
      case "link":
        setShowLinkInput(false)
        break
      case "image":
        setShowImageInput(false)
        break
      case "video":
        setShowVideoInput(false)
        break
      case "table":
        setShowTableInput(false)
        break
      default:
        break
    }

    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const handleFileSelect = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (files.length === 1) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgUrl = e.target.result;
        selectionManagerRef.current.restoreSelection();
        const imgHtml = `<img src="${imgUrl}" alt="Uploaded image" style="width: 600px;" />`;
        document.execCommand("insertHTML", false, imgHtml);
        selectionManagerRef.current.clearSelection();
        if (editorRef.current) {
          editorRef.current.focus();
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    const imageUrls = [];
    let loadedCount = 0;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageUrls.push({
          url: e.target.result,
          alt: file.name
        });
        loadedCount++;

        if (loadedCount === files.length) {
          selectionManagerRef.current.restoreSelection();
          
          const slideshowId = `slideshow-${Date.now()}`;
          const slideshowHtml = slideshowManagerRef.current.createSlideshowHtml(imageUrls, slideshowId);
          
          document.execCommand("insertHTML", false, slideshowHtml);
          
          setTimeout(() => {
            slideshowManagerRef.current.initializeSlideshow(slideshowId);
          }, 100);
          
          selectionManagerRef.current.clearSelection();
          if (editorRef.current) {
            editorRef.current.focus();
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }

  const handleContextMenu = (e) => {
    const target = e.target;
    
    if (target.tagName === 'IMG' || target.tagName === 'IFRAME' || 
        (target.tagName === 'DIV' && target.classList.contains('video-container'))) {
      e.preventDefault();
      
      let elementToResize = target;
      if (target.tagName === 'DIV' && target.classList.contains('video-container')) {
        elementToResize = target.querySelector('iframe');
      }
      
      setCurrentElement(elementToResize);
      
      let originalWidth = elementToResize.getAttribute('data-original-width');
      let originalHeight = elementToResize.getAttribute('data-original-height');
      
      if (!originalWidth || !originalHeight) {
        originalWidth = elementToResize.offsetWidth;
        originalHeight = elementToResize.offsetHeight;
        elementToResize.setAttribute('data-original-width', originalWidth);
        elementToResize.setAttribute('data-original-height', originalHeight);
      }
      
      setOriginalSize({
        width: parseInt(originalWidth),
        height: parseInt(originalHeight)
      });
      
      const currentWidth = elementToResize.offsetWidth;
      const sizePercentage = Math.round((currentWidth / parseInt(originalWidth)) * 100);
      setSizeValue(sizePercentage);
      
      setSizeDialogPosition({
        x: e.clientX,
        y: e.clientY
      });
      
      setShowSizeDialog(true);
    }
  }

  const applySizeChange = () => {
    if (!currentElement) return;
    
    const originalWidth = parseInt(currentElement.getAttribute('data-original-width'));
    const originalHeight = parseInt(currentElement.getAttribute('data-original-height'));
    
    const newWidth = Math.round(originalWidth * (sizeValue / 100));
    const newHeight = Math.round(originalHeight * (sizeValue / 100));
    
    currentElement.style.width = `${newWidth}px`;
    currentElement.style.height = `${newHeight}px`;
    
    setShowSizeDialog(false);
    setCurrentElement(null);
  }

  return (
    <div className="blog-editor">
      <div className="toolbar">
        <div className="toolbar-section">
          <button onClick={handleBold} className="toolbar-button" title="Bold">
            <Bold size={18} />
          </button>
          <button onClick={handleItalic} className="toolbar-button" title="Italic">
            <Italic size={18} />
          </button>
          <button onClick={handleUnderline} className="toolbar-button" title="Underline">
            <Underline size={18} />
          </button>
          <button onClick={handleStrikethrough} className="toolbar-button" title="Strikethrough">
            <Strikethrough size={18} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleInputFocus("color")
            }}
            className="toolbar-button"
            title="Text Color"
          >
            <div className="color-icon" style={{ backgroundColor: color }}></div>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleInputFocus("fontSize")
            }}
            className="toolbar-button"
            title="Font Size"
          >
            <span style={{ fontSize: "16px" }}>A</span>
          </button>
        </div>

        <div className="toolbar-section">
          <button
            onClick={(e) => {
              e.preventDefault()
              handleAlign("Left")
            }}
            className="toolbar-button"
            title="Align Left"
          >
            <AlignLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleAlign("Center")
            }}
            className="toolbar-button"
            title="Align Center"
          >
            <AlignCenter size={18} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleAlign("Right")
            }}
            className="toolbar-button"
            title="Align Right"
          >
            <AlignRight size={18} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleAlign("Full")
            }}
            className="toolbar-button"
            title="Justify"
          >
            <AlignJustify size={18} />
          </button>
        </div>

        <div className="toolbar-section">
          <button onClick={handleOrderedList} className="toolbar-button" title="Ordered List">
            <ListOrdered size={18} />
          </button>
          <button onClick={handleUnorderedList} className="toolbar-button" title="Unordered List">
            <List size={18} />
          </button>
        </div>

        <div className="toolbar-section">
          <button
            onClick={(e) => {
              e.preventDefault()
              handleInputFocus("link")
            }}
            className="toolbar-button"
            title="Insert Link"
          >
            <Link size={18} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleInputFocus("image")
            }}
            className="toolbar-button"
            title="Insert Image"
          >
            <ImageIcon size={18} />
          </button>
          <button
            onClick={handleFileSelect}
            className="toolbar-button"
            title="Upload Images"
          >
            <ImageIcon size={18} />+
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileChange} 
            multiple 
            accept="image/*" 
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              handleInputFocus("video")
            }}
            className="toolbar-button"
            title="Insert Video"
          >
            <Video size={18} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleInputFocus("table")
            }}
            className="toolbar-button"
            title="Insert Table"
          >
            <Table size={18} />
          </button>
          <button onClick={handleCodeInsert} className="toolbar-button" title="Insert Code">
            <Code size={18} />
          </button>
        </div>
      </div>

      {showColorPicker && (
        <div className="popup-input">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <button onClick={handleColor}>Apply Color</button>
          <button
            onClick={(e) => {
              e.preventDefault()
              closePopup("color")
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      )}

      {showFontSizeInput && (
        <div className="popup-input">
          <input type="number" min="8" max="72" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
          <button onClick={handleFontSizeChange}>Apply Size</button>
          <button
            onClick={(e) => {
              e.preventDefault()
              closePopup("fontSize")
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      )}

      {showLinkInput && (
        <div className="popup-input">
          <input type="text" placeholder="Enter URL" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
          <input
            type="text"
            placeholder="Link Text (optional)"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
          />
          <button onClick={handleLinkInsert}>Insert Link</button>
          <button
            onClick={(e) => {
              e.preventDefault()
              closePopup("link")
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      )}

      {showImageInput && (
        <div className="popup-input">
          <input
            type="text"
            placeholder="Enter Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image Alt Text"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
          />
          <button onClick={handleImageInsert}>Insert Image</button>
          <button
            onClick={(e) => {
              e.preventDefault()
              closePopup("image")
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      )}

      {showVideoInput && (
        <div className="popup-input">
          <input
            type="text"
            placeholder="Enter Video URL (YouTube, etc.)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <button onClick={handleVideoInsert}>Insert Video</button>
          <button
            onClick={(e) => {
              e.preventDefault()
              closePopup("video")
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      )}

      {showTableInput && (
        <div className="popup-input">
          <label>
            Rows:
            <input
              type="number"
              min="1"
              max="20"
              value={tableRows}
              onChange={(e) => setTableRows(Number.parseInt(e.target.value))}
            />
          </label>
          <label>
            Columns:
            <input
              type="number"
              min="1"
              max="10"
              value={tableCols}
              onChange={(e) => setTableCols(Number.parseInt(e.target.value))}
            />
          </label>
          <button onClick={handleTableInsert}>Insert Table</button>
          <button
            onClick={(e) => {
              e.preventDefault()
              closePopup("table")
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      )}

      {showSizeDialog && (
        <div 
          className="size-dialog" 
          style={{ 
            position: 'fixed', 
            left: `${sizeDialogPosition.x}px`, 
            top: `${sizeDialogPosition.y}px`,
            zIndex: 1000
          }}
        >
          <div className="size-dialog-content">
            <label>
              Size (%):
              <input
                type="range"
                min="10"
                max="200"
                value={sizeValue}
                onChange={(e) => setSizeValue(parseInt(e.target.value))}
              />
              <span>{sizeValue}%</span>
            </label>
            <div className="size-dialog-buttons">
              <button onClick={applySizeChange}>Apply</button>
              <button onClick={() => setShowSizeDialog(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div
        ref={editorRef}
        className="content-editable"
        contentEditable="true"
        onInput={handleContentChange}
        onSelect={handleTextSelection}
        onKeyDown={handleEditorKeyDown}
        onContextMenu={handleContextMenu}
        suppressContentEditableWarning={true}
      />

      <div className="editor-footer">
        <button className="save-button" onClick={handleSave}>
          Save Blog Post
        </button>
      </div>
    </div>
  )
}

export default BlogEditor