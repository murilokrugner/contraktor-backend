import * as Yup from 'yup';
import Contract from '../models/Contract';
import Partes from '../models/Partes';

class ContractIdController {
  async index(req, res) {

    const { id } = req.params;

    const contracts = await Contract.findAll({
      where: { id: id },
      attributes: ['id', 'title', 'initialdate', 'expirydate'],
    });

    return res.json(contracts);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      initialdate: Yup.date().required(),
      expirydate: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const contractExists = await Contract.findOne({
      where: { title: req.body.title },
    });

    if (contractExists) {
      return res.status(400).json({ error: 'Contract already exists' });
    }

    const { title, initialdate, expirydate } = req.body;

    const addContract = await Contract.create({
      title,
      initialdate,
      expirydate,
    });

    return res.json(addContract);
  }

  async update(req, res) {
    const contract = await Contract.findByPk(req.params.id);

    return res.json(contract);
  }

  async delete(req, res) {
    const contract = await Contract.findByPk(req.params.id, {
      include: [
        {
          model: Partes,
          as: 'partes',
          attributes: ['id', 'name'],
        },
      ],
    });

    contract.delete_at = new Date();

    await contract.save();

    return res.json(contract);
  }
}

export default new ContractIdController();
