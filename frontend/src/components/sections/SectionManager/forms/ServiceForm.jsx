// import { useEffect, useState } from "react"
// // import { serviceAPI } from "../../../api/serviceAPI"
// import IconSelect from "../../../ui/IconSelect/IconSelect"
// import "./FormStyles.css"
// import { createServiceAPI } from "../../../../api/serviceAPIs/createServiceApi"

// const ServiceForm = ({ onUpdate }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     icon: "",
//     subDescription: "",
//     description: "",
//     link: "",
//   })
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState("")

//   const handleChange = (e) => {
//     if (typeof e === 'string') {
//       setFormData((prev) => ({
//         ...prev,
//         icon: e,
//       }));
//       return;
//     }

//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };


//   const generateSlug = (title) => {
//     return title
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)/g, "")
//   }

//   const handleTitleChange = (e) => {
//     const title = e.target.value
//     setFormData((prev) => ({
//       ...prev,
//       title,
//       link: generateSlug(title),
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setMessage("")

//     try {
//     //   await serviceAPI.create(formData)
//       await createServiceAPI(formData)
//       setMessage("Service added successfully!")
//       setFormData({
//         title: "",
//         icon: "",
//         subDescription: "",
//         description: "",
//         link: ""
//       })
//       onUpdate()
//     } catch (error) {
//       setMessage("Error adding service. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     console.log(formData)
//   },[formData])

//   return (
//     <form className="form-container" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="title">Title *</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={formData.title}
//           onChange={handleTitleChange}
//           required
//           placeholder="Enter service title"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="icon">Icon *</label>
//         <IconSelect value={formData.icon} onChange={handleChange} />
//       </div>

//       <div className="form-group">
//         <label htmlFor="subDescription">Sub Description *</label>
//         <input
//           type="text"
//           id="subDescription"
//           name="subDescription"
//           value={formData.subDescription}
//           onChange={handleChange}
//           required
//           placeholder="Enter brief description"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Enter detailed description"
//           rows="4"
//         />
//       </div>

//       {/* <div className="form-group">
//         <label htmlFor="slug">Slug</label>
//         <input
//           type="text"
//           id="slug"
//           name="slug"
//           value={formData.slug}
//           onChange={handleChange}
//           placeholder="Auto-generated from title"
//         />
//       </div> */}

//       <div className="form-group">
//         <label htmlFor="link">Link</label>
//         <input
//           type="text"
//           id="link"
//           name="link"
//           value={formData.link}
//           onChange={handleChange}
//           placeholder="Enter service link (optional)"
//         />
//       </div>

//       {/* <div className="form-group checkbox-group">
//         <label htmlFor="isActive">
//           <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} />
//           Active Service
//         </label>
//       </div> */}

//       {message && <div className={`message ${message.includes("Error") ? "error" : "success"}`}>{message}</div>}

//       <button type="submit" className="submit-button" disabled={loading}>
//         {loading ? "Adding..." : "Add Service"}
//       </button>
//     </form>
//   )
// }

// export default ServiceForm


import { useEffect, useState } from "react"
import { Send, FileText, Star, LinkIcon } from "lucide-react"
import IconSelect from "../../../ui/IconSelect/IconSelect"
import "./FormStyles.css"
import { createServiceAPI } from "../../../../api/serviceAPIs/createServiceApi"

const ServiceForm = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    subDescription: "",
    description: "",
    link: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    if (typeof e === "string") {
      setFormData((prev) => ({
        ...prev,
        icon: e,
      }))
      return
    }

    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormData((prev) => ({
      ...prev,
      title,
      link: generateSlug(title),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      await createServiceAPI(formData)
      setMessage("Service added successfully!")
      setFormData({
        title: "",
        icon: "",
        subDescription: "",
        description: "",
        link: "",
      })
      onUpdate()
    } catch (error) {
      setMessage("Error adding service. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

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
          onChange={handleTitleChange}
          required
          placeholder="Enter service title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="icon">
          <Star className="label-icon" />
          Icon *
        </label>
        <IconSelect value={formData.icon} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="subDescription">
          <FileText className="label-icon" />
          Sub Description *
        </label>
        <input
          type="text"
          id="subDescription"
          name="subDescription"
          value={formData.subDescription}
          onChange={handleChange}
          required
          placeholder="Enter brief description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">
          <FileText className="label-icon" />
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter detailed description"
          rows="4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="link">
          <LinkIcon className="label-icon" />
          Link
        </label>
        <input
          type="text"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Enter service link (optional)"
        />
      </div>

      {message && <div className={`message ${message.includes("Error") ? "error" : "success"}`}>{message}</div>}

      <button type="submit" className="submit-button" disabled={loading}>
        <Send className="button-icon" />
        {loading ? "Adding..." : "Add Service"}
      </button>
    </form>
  )
}

export default ServiceForm