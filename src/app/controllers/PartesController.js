import * as Yup from 'yup';
import Partes from '../models/Partes';

class PartesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      lastname: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.string()
        .max(12)
        .required(),
      cpf: Yup.string()
        .max(12)
        .required(),
      contract_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const partesExists = await Partes.findOne({
      where: { email: req.body.email, cpf: req.body.cpf },
    });

    if (partesExists) {
      return res.status(400).json({ error: 'Partes already exists' });
    }

    const { name, lastname, email, phone, cpf, contract_id } = req.body;

    const addPartes = await Partes.create({
      name,
      lastname,
      email,
      phone,
      cpf,
      contract_id,
    });

    return res.json(addPartes);
  }
}

export default new PartesController();
