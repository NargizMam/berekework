import { MainCards } from '../../admin/widgets/mainCards';
import { TitleBlock } from '../../admin/widgets/titleBlock';
import { OurValuesBlock } from '../../client/widgets/ourValues';
import { PotentialEmployeesPageCardsBlock } from '../../client/widgets/PotentialEmployeesPageCardsBlock';
import { PotentialEmployeesStartBlock } from '../../client/widgets/potentialEmployeesStartBlock';
import { ChooseSpecialistBlock } from '../../client/widgets/specialistBlock';
import { RatesBLock } from '../../client/widgets/tariff/ui/ratesBLock';
import { VacancyBlock } from '../../client/widgets/vacancyBlock';
import { AboutUsBlock } from '../../client/widgets/aboutAsBlock';
import { EmployerBlock } from '../../client/widgets/employerBlock';
import { MediaBlock } from '../../client/widgets/MediaBlock';
import { LastNewsBlock } from '../../client/widgets/lastNewsBlock';


export const components = {
  titleblock: TitleBlock,
  maincard: MainCards,
  choosespecialist: ChooseSpecialistBlock,
	vacancies_block: VacancyBlock,
  tariff: RatesBLock,
  startblock: PotentialEmployeesStartBlock,
  ourvalues: OurValuesBlock,
  potentialemployeescardsblock: PotentialEmployeesPageCardsBlock,
  aboutusinfo: AboutUsBlock,
  aboutusvalues: OurValuesBlock,
  potentialemployees: EmployerBlock,
  galleryblock: MediaBlock,
  videoblock: MediaBlock,
  lastnews: LastNewsBlock,
};
