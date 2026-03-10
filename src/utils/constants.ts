import { version } from '../../package.json';

export const LINKS = {
	GITHUB: 'https://github.com/LeandroPata',
	LINKEDIN: 'https://www.linkedin.com/in/leandromfpata',
	EMAIL: 'lmfpata@gmail.com',
};

export const REPO = {
	NAME: 'Portfolio',
	USER: 'LeandroPata',
	VERSION: `v${version.charAt(0)}`,
};

export const CDN = `https://cdn.jsdelivr.net/gh/${REPO.USER}/${REPO.NAME}@${REPO.VERSION}`;
