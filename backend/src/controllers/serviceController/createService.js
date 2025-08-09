const Service = require('../../models/Service');

exports.createService = async (req, res) => {
  try {
    const { title, icon, subDescription, description, link } = req.body;
    
    const newService = new Service({
      title,
      icon,
      subDescription,
      description,
      link
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create service', error });
  }
};