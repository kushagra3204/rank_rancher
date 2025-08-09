// import { useState } from "react"
// import { createTestimonialAPI } from "../../../../api/testimonialAPIs/createTestimonialApi"
// import "./FormStyles.css"

// const TestimonialForm = ({ onUpdate }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     position: "",
//     content: "",
//     rating: 5,
//     image: "",
//   })
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState("")

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "rating" ? Number.parseInt(value) : value,
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setMessage("")

//     try {
//       // await testimonialAPI.create(formData)
//       const data = await createTestimonialAPI(formData);
      
//       if(!data) {
//         throw new Error("Testimonial Creation failed");
//       }

//       setMessage("Testimonial added successfully!")
//       setFormData({
//         name: "",
//         position: "",
//         content: "",
//         rating: 5,
//         image: "",
//       })
//       onUpdate()
//     } catch (error) {
//       setMessage("Error adding testimonial. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form className="form-container" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="name">Name *</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           placeholder="Enter customer name"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="position">Position *</label>
//         <input
//           type="text"
//           id="position"
//           name="position"
//           value={formData.position}
//           onChange={handleChange}
//           required
//           placeholder="Enter job position"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="content">Testimonial Content *</label>
//         <textarea
//           id="content"
//           name="content"
//           value={formData.content}
//           onChange={handleChange}
//           required
//           placeholder="Enter testimonial content"
//           rows="4"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="rating">Rating *</label>
//         <select id="rating" name="rating" value={formData.rating} onChange={handleChange} required>
//           <option value={1}>1 Star</option>
//           <option value={2}>2 Stars</option>
//           <option value={3}>3 Stars</option>
//           <option value={4}>4 Stars</option>
//           <option value={5}>5 Stars</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label htmlFor="image">Image URL *</label>
//         <input
//           type="url"
//           id="image"
//           name="image"
//           value={formData.image}
//           onChange={handleChange}
//           required
//           placeholder="Enter image URL"
//         />
//       </div>

//       {message && <div className={`message ${message.includes("Error") ? "error" : "success"}`}>{message}</div>}

//       <button type="submit" className="submit-button" disabled={loading}>
//         {loading ? "Adding..." : "Add Testimonial"}
//       </button>
//     </form>
//   )
// }

// export default TestimonialForm


import { useState } from "react"
import { Send, User, Briefcase, MessageSquare, Star, ImageIcon } from "lucide-react"
import { createTestimonialAPI } from "../../../../api/testimonialAPIs/createTestimonialApi"
import "./FormStyles.css"
import InputTagAndFileUpload from "../../../ui/InputTagAndFileUpload/InputTagAndFileUpload"

const TestimonialForm = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    content: "",
    rating: 5,
    image: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number.parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const data = await createTestimonialAPI(formData)

      if (!data) {
        throw new Error("Testimonial Creation failed")
      }

      setMessage("Testimonial added successfully!")
      setFormData({
        name: "",
        position: "",
        content: "",
        rating: 5,
        image: "",
      })
      onUpdate()
    } catch (error) {
      setMessage("Error adding testimonial. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">
          <User className="label-icon" />
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter customer name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="position">
          <Briefcase className="label-icon" />
          Position *
        </label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          placeholder="Enter job position"
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">
          <MessageSquare className="label-icon" />
          Testimonial Content *
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          placeholder="Enter testimonial content"
          rows="4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">
          <Star className="label-icon" />
          Rating *
        </label>
        <select id="rating" name="rating" value={formData.rating} onChange={handleChange} required>
          <option value={1}>⭐ 1 Star</option>
          <option value={2}>⭐⭐ 2 Stars</option>
          <option value={3}>⭐⭐⭐ 3 Stars</option>
          <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
          <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="image">
          <ImageIcon className="label-icon" />
          Image URL *
        </label>
        {/* <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          placeholder="Enter image URL"
        /> */}
        <InputTagAndFileUpload 
          name={"image"} 
          label={"Enter image URL or upload"} 
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      {message && <div className={`message ${message.includes("Error") ? "error" : "success"}`}>{message}</div>}

      <button type="submit" className="submit-button" disabled={loading}>
        <Send className="button-icon" />
        {loading ? "Adding..." : "Add Testimonial"}
      </button>
    </form>
  )
}

export default TestimonialForm