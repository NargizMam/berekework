export interface Tariff {
  _id: string;
  title: string;
  description: string[];
}

export interface TariffsApi {
  _id: string;
  tariffs: Tariff[];
}

export interface TariffMutation {
  title: string;
  description: string[];
}