class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate :less_than_six?

  def less_than_six?
    if self.trainer.pokemons.count >= 6
      errors.add(:trainer, "can't have more than 6 Pokemon")
    end
  end
end
