import '../css/footer.css';
import '../css/footerMedia.css';
import { PrismicRichText, useSinglePrismicDocument } from '@prismicio/react';

const Footer = () => {
	const [document] = useSinglePrismicDocument('footer');
	
	if (!document) {
		console.log('Document not loaded'); // Debug message
		return null; // Или любой другой индикатор загрузки
	}
	
	const data = document.data;
	
	console.log('Document loaded', data); // Debug message
	
	return (
		<div className='footer'>
			<div className='container'>
				<div className='footer-top'>
					{data.body.map((section, index) => (
						<div key={index}>
							{section.primary.links_block_title && (
								<h6 className='footer-title'>
									<PrismicRichText field={section.primary.links_block_title} />
								</h6>
							)}
							<nav className='footer-nav'>
								{section.items.map((item, index) => (
									<li key={index} className='footer-nav-item'>
										<a href={item.reference_path} className='footer-nav-link'>
											{item.links_name}
										</a>
									</li>
								))}
							</nav>
						</div>
					))}
				</div>
				<div className='footer-bottom container'>
					{data['logo-footer']?.url && (
						<img src={data['logo-footer'].url} alt={data['logo-footer'].alt || 'logo-footer'} className='logo-footer' />
					)}
					<div className='footer-bottom-text-content'>
						{data.body.map((section, index) => {
							if (section.slice_type === 'social_media_block') {
								return (
									<div key={index} className='footer-icon-div'>
										{section.primary.title_media_block && (
											<h6 className='footer-title'>
												<PrismicRichText field={section.primary.title_media_block} />
											</h6>
										)}
										<nav className='footer-nav footer-icon-bottom'>
											{section.items.map((item, index) => (
												<li key={index} className='footer-bottom-nav-item'>
													<a href={item.link_social_media.url} className='footer-nav-link'>
														<img className='icon-img' src={item.social_media_icon.url} alt={item.social_media_icon.alt || 'social icon'} />
													</a>
												</li>
											))}
										</nav>
									</div>
								);
							} else if (section.slice_type === 'contacts_block') {
								return (
									<div key={index} className='footer-contacts'>
										{section.primary.title_contacts_block && (
											<h6 className='footer-title'>
												<PrismicRichText field={section.primary.title_contacts_block} />
											</h6>
										)}
										{section.items.map((item, index) => (
											<p key={index} className='footer-contacts-content'>{item.contact_details}</p>
										))}
									</div>
								);
							}
							return null;
						})}
					</div>
				</div>
				<p className='footer-bottom-text'>{data.copyright}</p>
			</div>
		</div>
	);
};

export default Footer;
