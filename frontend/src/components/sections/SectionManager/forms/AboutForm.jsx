// import { useState } from "react"
// // import { aboutAPI } from "../../../api/aboutAPI"
// import "./FormStyles.css"

// const AboutForm = ({ onUpdate }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//   })
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState("")

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setMessage("")

//     try {
//     //   await aboutAPI.create(formData)
//       setMessage("About section added successfully!")
//       setFormData({
//         title: "",
//         description: "",
//       })
//       onUpdate()
//     } catch (error) {
//       setMessage("Error adding about section. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form className="form-container" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="title">Title *</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           placeholder="Enter section title"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="description">Description *</label>
//         <textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           placeholder="Enter description"
//           rows="6"
//         />
//       </div>

//       {message && <div className={`message ${message.includes("Error") ? "error" : "success"}`}>{message}</div>}

//       <button type="submit" className="submit-button" disabled={loading}>
//         {loading ? "Adding..." : "Add About Section"}
//       </button>
//     </form>
//   )
// }

// export default AboutForm


import { useState } from "react"
import { Send, FileText } from "lucide-react"
import "./FormStyles.css"

const AboutForm = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      // await aboutAPI.create(formData)
      setMessage("About section added successfully!")
      setFormData({
        title: "",
        description: "",
      })
      onUpdate()
    } catch (error) {
      setMessage("Error adding about section. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">
          <FileText className="label-icon" />
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter section title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">
          <FileText className="label-icon" />
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Enter description"
          rows="6"
        />
      </div>

      {message && <div className={`message ${message.includes("Error") ? "error" : "success"}`}>{message}</div>}

      <button type="submit" className="submit-button" disabled={loading}>
        <Send className="button-icon" />
        {loading ? "Adding..." : "Add About Section"}
      </button>
    </form>
  )
}

export default AboutForm