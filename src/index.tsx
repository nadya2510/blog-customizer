import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const defaultState: ArticleStateType = defaultArticleState;
	const [style, setStyle] = useState<ArticleStateType>(defaultState);

	function onApply(newStyle: ArticleStateType) {
		setStyle(newStyle);
	}

	function onReset() {
		setStyle(defaultState);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': style.fontFamilyOption.value,
					'--font-size': style.fontSizeOption.value,
					'--font-color': style.fontColor.value,
					'--container-width': style.contentWidth.value,
					'--bg-color': style.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={onApply} onReset={onReset} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
