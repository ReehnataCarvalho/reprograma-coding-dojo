const { connect } = require('./PokemonsApiRepository')
const treinadoresModel = require('./TreinadoresSchema')
const { pokemonsModel } = require('./PokemonsSchema')
const jwt = require('jsonwebtoken')
const LIMITE_NIVEL_POKEMON = 150

connect()

const calcularNivel = (datas, nivelAnterior) => {
  const diff = Math.abs(new Date(datas.dataInicio) - new Date(datas.dataFim)) / 3600000
  const novoNivel = diff / 4 + nivelAnterior;

  return novoNivel >= LIMITE_NIVEL_POKEMON ? LIMITE_NIVEL_POKEMON : novoNivel;
}
const getPokemon = () =>{
  return treinadoresModel.findOneAndUpdate(
    { _id: treinadorId, "pokemons._id": pokemonId },
    { $set: { "pokemons.$": { ...pokemon, _id: pokemonId } } },
    { new: true }
  )
}

const getAll = () => {
  return treinadoresModel.find((error, treinadores) => {
    return treinadores
  })
}

const getById = (id) => {
  return treinadoresModel.findById(id)
}

const add = (treinador) => {
  const novoTreinador = new treinadoresModel(treinador)
  return novoTreinador.save()
}

const remove = (id) => {
  return treinadoresModel.findByIdAndDelete(id)
}

const update = (id, treinador) => {
  return treinadoresModel.findByIdAndUpdate(
    id,
    { $set: treinador },
    { new: true },
  )
}

const addPokemon = async (treinadorId, pokemon) => {
  const treinador = await getById(treinadorId)
  const novoPokemon = new pokemonsModel(pokemon)

  treinador.pokemons.push(novoPokemon)
  return treinador.save()
}

const treinarPokemon = async (treinadorId, pokemonId, datas) => {
  const treinador = await getById(treinadorId)
  const pokemon = treinador.pokemons.find(pokemon => pokemon._id == pokemonId)

  if (pokemon.nivel >= LIMITE_NIVEL_POKEMON) {
    throw new Error('Seu pokémon já é forte o suficiente!')
  }

  pokemon.nivel = calcularNivel(datas, pokemon.nivel)
  return treinador.save()
}

const getPokemons = async treinadorId => {
  const treinador = await getById(treinadorId)
  return treinador.pokemons
}

const updatePokemon = (treinadorId, pokemonId, pokemon) => {
  return treinadoresModel.findOneAndUpdate(
    { _id: treinadorId, "pokemons._id": pokemonId },
<<<<<<< HEAD
    { $set: { "pokemons.$": { ...pokemon, _id: pokemonId } } },
    { new: true }
  )
}

=======
    { $set: { "pokemons.$": { ...pokemon, _id: pokemonId } } }, // sem usar o spread operator (...), obteremos um objeto dentro de outro (ao invés de vários atributos para alterar o pokemon)
    { new: true } // precisamos disso para retornar uma nova instância do pokemon que encontramos, para podermos vê-lo atualizado
  )
}

const getByPokemonId = async (treinadorId, pokemonId) => {
  const treinador = await getById(treinadorId)
  return treinador.pokemons.find(pokemon => {
    return pokemon._id == pokemonId
  })
}

>>>>>>> 5565599507d9bb0f30e09fdc80a2f6cf2f534dc2
module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  addPokemon,
  treinarPokemon,
  getPokemons,
<<<<<<< HEAD
  updatePokemon
=======
  updatePokemon,
  getByPokemonId
>>>>>>> 5565599507d9bb0f30e09fdc80a2f6cf2f534dc2
}
