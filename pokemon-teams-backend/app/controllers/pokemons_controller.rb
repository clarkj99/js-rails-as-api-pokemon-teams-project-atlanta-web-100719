class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find_by(id: pokemon_params[:trainer_id])
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.new(nickname: name, species: species, trainer_id: trainer.id)
    if pokemon.valid?
      pokemon.save
      render json: pokemon, except: [:created_at, :updated_at]
    else
      render json: { status: "error", code: 403, message: pokemon.errors.full_messages[0] }, status: 403
    end
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
