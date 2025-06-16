// Utility class to manage text selections
class SelectionManager {
  constructor() {
    this.savedSelection = null
    this.savedRange = null
    this.highlightClass = "selection-highlight"
  }

  // Save the current selection
  saveSelection() {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      this.savedRange = selection.getRangeAt(0).cloneRange()
      this.savedSelection = {
        startContainer: selection.anchorNode,
        startOffset: selection.anchorOffset,
        endContainer: selection.focusNode,
        endOffset: selection.focusOffset,
        collapsed: selection.isCollapsed,
      }
      return true
    }
    return false
  }

  // Restore the saved selection
  restoreSelection() {
    if (this.savedRange) {
      const selection = window.getSelection()
      selection.removeAllRanges()

      try {
        // Check if the saved range is still valid
        if (this.savedRange.startContainer.parentNode && this.savedRange.endContainer.parentNode) {
          selection.addRange(this.savedRange)
          return true
        }
      } catch (e) {
        console.warn("Could not restore selection:", e)
      }
    }
    return false
  }

  highlightSelection() {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0)
      const span = document.createElement("span")
      span.className = this.highlightClass

      try {
        range.surroundContents(span)
      } catch (e) {
        // If surroundContents fails, use extractContents and insertNode
        const contents = range.extractContents()
        span.appendChild(contents)
        range.insertNode(span)
      }
    }
  }

  // Remove all highlights
  removeHighlights(container) {
    if (!container) return
    const highlights = container.querySelectorAll(`.${this.highlightClass}`)
    highlights.forEach((highlight) => {
      const parent = highlight.parentNode
      while (highlight.firstChild) {
        parent.insertBefore(highlight.firstChild, highlight)
      }
      parent.removeChild(highlight)
    })
  }

  // Check if we have a saved selection
  hasSelection() {
    return this.savedRange !== null
  }

  // Clear saved selection
  clearSelection() {
    this.savedSelection = null
    this.savedRange = null
  }

  // Get the current selection text
  getSelectionText() {
    const selection = window.getSelection()
    return selection ? selection.toString() : ""
  }

  // Check if there's currently selected text
  hasCurrentSelection() {
    const selection = window.getSelection()
    return selection && selection.rangeCount > 0 && !selection.isCollapsed
  }
}

export default SelectionManager