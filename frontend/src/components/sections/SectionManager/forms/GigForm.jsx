import { useEffect, useState } from "react"
import { Send, FileText, User, Package, HelpCircle, Plus, Trash2, Info, Image } from "lucide-react"
import "./FormStyles.css"
import { createGigAPI } from "../../../../api/gigAPIs/createGigApi"
import Tooltip from '@mui/material/Tooltip';
import FlagIconSelect from "../../../ui/IconSelect/FlagIconSelect";
import ImageFormComponent from "../../../ui/ImageFormComponent/ImageFormComponent";
import InputTagAndFileUpload from "../../../ui/InputTagAndFileUpload/InputTagAndFileUpload";

const initialFormState = {
  slug: "",
  title: "",
  seller: {
    name: "",
    avatar: "",
    level: "",
    rating: 5,
    reviews: null,
    country: "",
    languages: [],
    ordersInQueue: null,
    completedOrders: null,
  },
  subDescription: "",
  description: "",
  expertiseAreas: [],
  languages: [],
  reviews: [],
  images: [],
  averageRating: 5,
  packages: [],
  faqs: [],
  comparePackages: false,
  compareFeatures: [],
  gigURL: "",
}

const GigForm = ({ onUpdate }) => {
  const [formData, setFormData] = useState(initialFormState)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (formData.packages.length <= 1 && formData.comparePackages) {
      setFormData((prev) => ({
        ...prev,
        comparePackages: false
      }));
    }
  }, [formData.packages.length, formData.comparePackages]);

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("seller.")) {
      const field = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        seller: { ...prev.seller, [field]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleArrayChange = (field, value) => {
    const array = value
      ?.split(",")
      ?.map((item) => item.trim())
      ?.filter(Boolean)
    setFormData((prev) => ({ ...prev, [field]: array }))
  }

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      const data = await createGigAPI(formData)
      if(data) {
        setMessage("Gig added successfully!")
        setFormData(initialFormState)
        onUpdate() 
      } else {
        throw new Error("Error adding gig.")
      }
    } catch {
      setMessage("Error adding gig. Please try again.")
    } finally {
      setLoading(false)
    }
  }



  return (
    <form className="form-container gig-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>
          <FileText className="section-icon" />
          Gig Information
        </h3>

        <div className="form-group">
          <label>
            <FileText className="label-icon" />
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            required
            placeholder="Enter gig title"
          />
        </div>

        <div className="form-group">
          <label>
            <FileText className="label-icon" />
            Sub Description
          </label>
          <input
            type="text"
            name="subDescription"
            value={formData.subDescription}
            onChange={handleChange}
            placeholder="Enter brief description"
          />
        </div>

        <div className="form-group">
          <label>
            <FileText className="label-icon" />
            Gig URL
          </label>
          <input
            type="text"
            name="gigURL"
            value={formData.gigURL}
            onChange={handleChange}
            placeholder="Enter gig url from fiverr"
          />
        </div>

        <div className="form-group">
          <label>
            <FileText className="label-icon" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter detailed description"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>
            <FileText className="label-icon" />
            Expertise Areas (comma separated)
          </label>
          <input
            type="text"
            onChange={(e) => handleArrayChange("expertiseAreas", e.target.value)}
            placeholder="e.g., Web Development, React, Node.js"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>
          <Image className="section-icon" />
          Images
        </h3>
        <ImageFormComponent formData={formData} setFormData={setFormData} />
      </div>

      {/* Languages */}
      <div className="form-section">
        <h3>
          <FileText className="section-icon" />
          Languages
        </h3>
        {formData?.languages?.map((lang, index) => (
          <div key={index} className="form-row">
            <input
              type="text"
              placeholder="Language Name"
              value={lang.name}
              onChange={(e) => {
                const updated = [...formData.languages]
                updated[index].name = e.target.value
                setFormData({ ...formData, languages: updated })
              }}
            />
            <input
              type="text"
              placeholder="Proficiency Level"
              value={lang.level}
              onChange={(e) => {
                const updated = [...formData.languages]
                updated[index].level = e.target.value
                setFormData({ ...formData, languages: updated })
              }}
            />
            {/* <button
              type="button"
              className="icon-button danger"
              onClick={() => {
                const updated = formData.languages.filter((_, i) => i !== index)
                setFormData({ ...formData, languages: updated })
              }}
            > */}
              <Trash2
                size={"62px"}
                color="red"
                style={{cursor: "pointer"}}
                onClick={() => {
                  const updated = formData.languages.filter((_, i) => i !== index)
                  setFormData({ ...formData, languages: updated })
                }}
              />
            {/* </button> */}
          </div>
        ))}
        <button
          type="button"
          className="icon-button primary"
          onClick={() => setFormData({ ...formData, languages: [...formData.languages, { name: "", level: "" }] })}
        >
          <Plus size={16} />
          Add Language
        </button>
        
      </div>

      {/* Packages */}
      <div className="form-section">
        <h3>
          <Package className="section-icon" />
          Packages
        </h3>
        {formData?.packages?.map((pkg, index) => (
          <div key={index} className="package-section">
            <div className="form-row">
              <input
                type="text"
                placeholder="Package Name"
                value={pkg.name}
                onChange={(e) => {
                  const updated = [...formData.packages]
                  updated[index].name = e.target.value
                  setFormData({ ...formData, packages: updated })
                }}
              />
              <input
                type="number"
                placeholder="Price"
                value={pkg.price}
                onChange={(e) => {
                  const updated = [...formData.packages]
                  updated[index].price = Number.parseFloat(e.target.value)
                  setFormData({ ...formData, packages: updated })
                }}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Description"
                value={pkg.description}
                onChange={(e) => {
                  const updated = [...formData.packages]
                  updated[index].description = e.target.value
                  setFormData({ ...formData, packages: updated })
                }}
                style={{width: "100%"}}
              />
            </div>
            <div className="form-row">
              <input
                type="number"
                placeholder="Delivery Time (days)"
                value={pkg.deliveryTime}
                onChange={(e) => {
                  const updated = [...formData.packages]
                  updated[index].deliveryTime = Number.parseInt(e.target.value)
                  setFormData({ ...formData, packages: updated })
                }}
              />
              <input
                type="text"
                placeholder="Features (comma separated)"
                value={pkg.features?.join(", ")}
                onChange={(e) => {
                  const updated = [...formData.packages]
                  updated[index].features = e.target.value.split(",")?.map((f) => f.trim())
                  setFormData({ ...formData, packages: updated })
                }}
              />
            </div>
            <button
              type="button"
              className="icon-button danger"
              onClick={() => {
                const updated = formData.packages.filter((_, i) => i !== index)
                setFormData({ ...formData, packages: updated })
              }}
            >
              <Trash2 size={"22px"} />
              Remove Package
            </button>
          </div>
        ))}
        <button
          type="button"
          className="icon-button primary"
          onClick={() =>
            setFormData({
              ...formData,
              packages: [
                ...formData.packages,
                {
                  name: "",
                  price: null,
                  description: "",
                  deliveryTime: null,
                  features: [],
                },
              ],
            })
          }
        >
          <Plus size={16} />
          Add Package
        </button>
      </div>

      {/* Seller Info */}
      <div className="form-section">
        <h3>
          <User className="section-icon" />
          Seller Information
        </h3>
        <div className="form-row">
          <div className="form-group">
            <label>
              <User className="label-icon" />
              Seller Name *
            </label>
            <input
              type="text"
              name="seller.name"
              value={formData?.seller?.name}
              onChange={handleChange}
              required
              placeholder="Enter seller name"
            />
          </div>
          <div className="form-group">
            <label>
              <User className="label-icon" />
              Avatar URL
            </label>
            {/* <input
              type="url"
              name="seller.avatar"
              value={formData?.seller?.avatar}
              onChange={handleChange}
              placeholder="Enter avatar URL"
            /> */}
            <InputTagAndFileUpload name={"seller.avatar"} label={"Enter avatar URL"} value={formData?.seller?.avatar} onChange={handleChange}  />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              <User className="label-icon" />
              Level
            </label>
            <input
              type="text"
              name="seller.level"
              value={formData?.seller?.level}
              onChange={handleChange}
              placeholder="Enter Level"
            />
            {/* <select name="seller.level" value={formData?.seller?.level} onChange={handleChange}>
              <option value="Level 1">Level 1</option>
              <option value="Level 2">Level 2</option>
              <option value="Top Rated">Top Rated</option>
              <option value="Pro">Pro</option>
            </select> */}
          </div>
          <div className="form-group">
            <label>
              <User className="label-icon" />
              Country
            </label>
            <input
              type="text"
              name="seller.country"
              value={formData.seller.country}
              onChange={handleChange}
              placeholder="Enter country"
            />
          </div>
        </div>
      </div>

      {/* Compare Packages */}
      <div className="form-section">
        <h3>
          <Package className="section-icon" />
          Package Comparison
        </h3>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
          <div className="checkbox-wrapper">
            <input
              type="checkbox" 
              id="cbx-3"
              checked={formData.packages.length > 1 ? formData.comparePackages : 0}
              onChange={(e) =>
                formData.packages.length > 1 &&
                setFormData((prev) => ({
                  ...prev,
                  comparePackages: e.target.checked,
                }))
              } 
            />
            {formData.packages.length > 1 ?
              <label for="cbx-3" className="toggle" style={{cursor: "pointer"}}><span></span></label>
            :
            <Tooltip title="Need to have atleast 2 packages" arrow>
              <label for="cbx-3" className="toggle" style={{cursor: "not-allowed"}}><span></span></label>
            </Tooltip>
            }
          </div>
          <div>Enable Compare Packages</div>
        </div>

        {/* {formData.comparePackages && formData.packages.length > 1 && <h4>Compare Features</h4>}
        {formData.comparePackages && formData.packages.length > 1 && formData.compareFeatures?.map((feature, index) => (
          <div key={index} className="form-row">
            <input
              type="text"
              placeholder="Feature name"
              value={feature.name}
              onChange={(e) => {
                const updated = [...formData.compareFeatures]
                updated[index].name = e.target.value
                setFormData({ ...formData, compareFeatures: updated })
              }}
            />
            <input
              type="text"
              placeholder="Comma-separated values"
              value={feature.values.join(", ")}
              onChange={(e) => {
                const updated = [...formData.compareFeatures]
                updated[index].values = e.target.value.split(",")?.map((v) => v.trim())
                setFormData({ ...formData, compareFeatures: updated })
              }}
            />
            <button
              type="button"
              className="icon-button danger"
              onClick={() => {
                const updated = formData.compareFeatures.filter((_, i) => i !== index)
                setFormData({ ...formData, compareFeatures: updated })
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {formData.comparePackages && formData.packages.length > 1 && <button
          type="button"
          className="icon-button primary"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              compareFeatures: [...prev.compareFeatures, { name: "", values: [] }],
            }))
          }
        >
          <Plus size={16} />
          Add Compare Feature
        </button>} */}
      {formData.comparePackages && formData.packages.length > 1 && <h4>Compare Features</h4>}
      {formData.comparePackages && formData.packages.length > 1 &&
        formData.compareFeatures?.map((feature, featureIndex) => (
          <div key={featureIndex} className="form-section">
            <div className="form-row">
              <input
                type="text"
                placeholder="Feature name"
                value={feature.name}
                onChange={(e) => {
                  const updated = [...formData.compareFeatures];
                  updated[featureIndex].name = e.target.value;
                  setFormData({ ...formData, compareFeatures: updated });
                }}
                className="feature-name-input"
              />
            </div>
            {formData.packages.map((pkg, pkgIndex) => (
              <div key={pkgIndex} className="form-row">
                {/* <label>{pkg.name}:</label> */}
                <input
                  type="text"
                  value={feature.values?.[pkgIndex] || ""}
                  placeholder={`Value for ${pkg.name}`}
                  onChange={(e) => {
                    const updated = [...formData.compareFeatures];
                    const newValues = [...(updated[featureIndex].values || [])];
                    newValues[pkgIndex] = e.target.value;
                    updated[featureIndex].values = newValues;
                    setFormData({ ...formData, compareFeatures: updated });
                  }}
                />
              </div>
            ))}

            <button
              type="button"
              className="icon-button danger"
              onClick={() => {
                const updated = formData.compareFeatures.filter((_, i) => i !== featureIndex);
                setFormData({ ...formData, compareFeatures: updated });
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
      ))}

      {formData.comparePackages && formData.packages.length > 1 && (
        <button
          type="button"
          className="icon-button primary"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              compareFeatures: [...prev.compareFeatures, { name: "", values: [] }],
            }))
          }
        >
          <Plus size={16} />
          Add Compare Feature
        </button>
      )}
      </div>

      {/* Reviews */}
      <div className="form-section">
        <h3>
          <FileText className="section-icon" />
          Reviews
        </h3>
        {formData.reviews?.map((review, index) => (
          <div key={index} className="form-group">
            <div className="form-row" style={{display: "grid", gridRow: "2"}}>
            <input
              type="text"
              placeholder="Name"
              value={review.name}
              onChange={(e) => {
                const updated = [...formData.reviews]
                updated[index].name = e.target.value
                setFormData({ ...formData, reviews: updated })
              }}
            />
            {/* <input
              type="text"
              placeholder="Avatar URL"
              value={review.avatar}
              onChange={(e) => {
                const updated = [...formData.reviews]
                updated[index].avatar = e.target.value
                setFormData({ ...formData, reviews: updated })
              }}
            /> */}
            <InputTagAndFileUpload name={"image"} label={"Avatar URL"} value={review.avatar}
              onChange={(e) => {
                const updated = [...formData.reviews]
                updated[index].avatar = e.target.value
                setFormData({ ...formData, reviews: updated })
              }}
            />
          </div>
          <div className="form-row" style={{display: "grid", gridRow: "2"}}>
            <FlagIconSelect
              value={review.countryCode}
              onChange={(country, countryCode) => {
                const updated = [...formData.reviews];
                updated[index].countryCode = countryCode;
                updated[index].country = country;
                updated[index].countryFlag = `https://flagcdn.com/160x120/${countryCode}.png`
                setFormData({ ...formData, reviews: updated });
              }}
            />
            <input
              type="number"
              placeholder="Rating"
              value={review.rating}
              onChange={(e) => {
                const updated = [...formData.reviews]
                updated[index].rating = parseFloat(e.target.value)
                setFormData({ ...formData, reviews: updated })
              }}
            />
          </div>
          <div className="form-row" style={{display: "grid", gridRow: "2"}}>
            <input
              type="date"
              placeholder="Date"
              value={review.date?.slice(0, 10) || ""}
              onChange={(e) => {
                const updated = [...formData.reviews]
                updated[index].date = e.target.value
                setFormData({ ...formData, reviews: updated })
              }}
            />
            <input
              type="text"
              placeholder="Comment"
              value={review.comment}
              onChange={(e) => {
                const updated = [...formData.reviews]
                updated[index].comment = e.target.value
                setFormData({ ...formData, reviews: updated })
              }}
            />
          </div>
          <div className="form-row" style={{display: "grid", gridRow: "2"}}>
            <input
              type="text"
              placeholder="Seller Response (optional)"
              value={review.sellerResponse || ""}
              onChange={(e) => {
                const updated = [...formData.reviews]
                updated[index].sellerResponse = e.target.value
                setFormData({ ...formData, reviews: updated })
              }}
            />
            <button
              type="button"
              className="icon-button danger"
              onClick={() => {
                const updated = formData.reviews.filter((_, i) => i !== index)
                setFormData({ ...formData, reviews: updated })
              }}
            >
              <Trash2 size={16} />
              Remove
            </button> 
          </div>
        </div>
        ))}

        <button
          type="button"
          className="icon-button primary"
          onClick={() =>
            setFormData({
              ...formData,
              reviews: [
                ...formData.reviews,
                {
                  name: "",
                  avatar: "",
                  country: "",
                  countryFlag: "",
                  rating: null,
                  date: new Date().toISOString().slice(0, 10),
                  comment: "",
                  sellerResponse: "",
                },
              ],
            })
          }
        >
          <Plus size={16} />
          Add Review
        </button>
      </div>

      {/* FAQs */}
      <div className="form-section">
        <h3>
          <HelpCircle className="section-icon" />
          FAQs
        </h3>
        {formData.faqs?.map((faq, index) => (
          <div key={index} className="faq-item-form">
            <input
              type="text"
              placeholder="Question"
              value={faq.question}
              onChange={(e) => {
                const updated = [...formData.faqs]
                updated[index].question = e.target.value
                setFormData({ ...formData, faqs: updated })
              }}
            />
            <textarea
              placeholder="Answer"
              value={faq.answer}
              rows="3"
              onChange={(e) => {
                const updated = [...formData.faqs]
                updated[index].answer = e.target.value
                setFormData({ ...formData, faqs: updated })
              }}
            />
            <button
              type="button"
              className="icon-button danger"
              onClick={() => {
                const updated = formData.faqs.filter((_, i) => i !== index)
                setFormData({ ...formData, faqs: updated })
              }}
            >
              <Trash2 size={16} />
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="icon-button primary"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              faqs: [...prev.faqs, { question: "", answer: "" }],
            }))
          }
        >
          <Plus size={16} />
          Add FAQ
        </button>
      </div>

      {message && <div className={`message ${message.includes("Error") ? "error" : "success"}`}>{message}</div>}

      <button type="submit" className="submit-button" disabled={loading}>
        <Send className="button-icon" />
        {loading ? "Adding..." : "Add Gig"}
      </button>
    </form>
  )
}

export default GigForm