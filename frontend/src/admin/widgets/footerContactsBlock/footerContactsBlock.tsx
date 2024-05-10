import { IContactsBlock } from '../../../shared/types';
import React from 'react';

interface FooterContactsBlock {
  contactBlockItems: IContactsBlock[];
}

const FooterContactsBlock: React.FC<FooterContactsBlock> = ({contactBlockItems}) => {
  return (
    <div className="footerLinksBlocks">
      {contactBlockItems.map((block, index) => (
        <div className="footerLinksBlock" key={index}>
          <h1>{block.title}</h1>
          <ul className="links-list">
            {block.contactsDetailsArr.map((link, linkIndex) => (
              <li key={linkIndex}>{link.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterContactsBlock;