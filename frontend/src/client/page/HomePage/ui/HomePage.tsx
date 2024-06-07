import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { components } from '../../../../app/constants/components';
import LastNewsBlock from '../../../widgets/lastNewsBlock/ui/LastNewsBlock';

export const HomePage = () => {
	const [document] = usePrismicDocumentByUID('pages', 'ps5');
	
	return (
		<>
			<div style={{ marginTop: 100 }}>
				<SliceZone slices={document?.data.body} components={{ ...components }} />
			</div>
			<div style={{ marginTop: 100 }}>
				{/*<SliceZone*/}
				{/*  slices={document?.data.body}*/}
				{/*  components={{*/}
				{/*    startscreen: StartScreen,*/}
				{/*  }}*/}
				{/*/>*/}
				<LastNewsBlock />
			</div>
		</>
	);
};
