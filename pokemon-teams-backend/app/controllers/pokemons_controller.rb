class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find_by(id: pokemon_params[:trainer_id])
    pokemon = fakermon(trainer)
    render json: pokemon, except: [:created_at, :updated_at]
  end

  def fakermon(trainer)
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
  end

  def destroy
    pokemon = Pokemon.find_by(id: pokemon_params[:id])
    if pokemon
      copy_pokemon = pokemon
      pokemon.destroy
      render json: copy_pokemon, except: [:created_at, :updated_at]
    end
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(:id, :trainer_id)
  end
end
