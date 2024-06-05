import { MainCards } from '../../admin/widgets/mainCards';
import { TitleBlock } from '../../admin/widgets/titleBlock';
import { OurValuesBlock } from '../../client/widgets/ourValues';
import { PotentialEmployeesPageCardsBlock } from '../../client/widgets/PotentialEmployeesPageCardsBlock';
import { PotentialEmployeesStartBlock } from '../../client/widgets/potentialEmployeesStartBlock';
import { ChooseSpecialistBlock } from '../../client/widgets/specialistBlock';
import { RatesBLock } from '../../client/widgets/tariff/ui/ratesBLock';
import { VacancyBlock } from '../../client/widgets/vacancyBlock';


export const components = {
  titleblock: TitleBlock,
  maincard: MainCards,
	vacancies_block: VacancyBlock,
  choosespecialist: ChooseSpecialistBlock,
  tariff: RatesBLock,
  startblock: PotentialEmployeesStartBlock,
  potentialemployeescardsblock: PotentialEmployeesPageCardsBlock,
  ourvalues: OurValuesBlock,
};
