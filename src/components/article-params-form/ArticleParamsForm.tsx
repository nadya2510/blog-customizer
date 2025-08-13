import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
type ArticleParamsFormProps = {
	onApply: (newStyle: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { onApply, onReset } = props;
	const [open, setOpen] = useState(false);
	const openClass = open
		? `${styles.container} ${styles.container_open}`
		: `${styles.container}`;

	const defaultState: ArticleStateType = defaultArticleState;
	const [styleForm, setStyleForm] = useState(defaultState);

	const handleChange = (name: string, selected: OptionType) => {
		setStyleForm({
			...styleForm,
			[name]: selected,
		});
	};

	const handleApplyClick = () => {
		onApply(styleForm);
		setOpen(!open);
	};

	const handleResetClick = () => {
		setStyleForm(defaultState);
		onReset();
	};

	return (
		<>
			<ArrowButton
				isOpen={open}
				onClick={() => {
					setOpen(!open);
				}}
			/>
			<aside className={openClass}>
				<form className={styles.form}>
					<Text
						children={<h2>Задайте параметры</h2>}
						size={31}
						dynamic={false}
						weight={800}
						fontStyle={'normal'}
						uppercase={true}
						align={'left'}
						family={'open-sans'}
					/>
					<Select
						selected={styleForm.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) => {
							handleChange('fontFamilyOption', selected);
						}}
						title={'шрифт'}
					/>
					<RadioGroup
						name={'fontSize'}
						selected={styleForm.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected: OptionType) =>
							handleChange('fontSizeOption', selected)
						}
						title={'размер шрифта'}
					/>
					<Select
						selected={styleForm.fontColor}
						options={fontColors}
						onChange={(selected: OptionType) =>
							handleChange('fontColor', selected)
						}
						title={'цвет шрифта'}
					/>
					<Separator />
					<Select
						selected={styleForm.backgroundColor}
						options={backgroundColors}
						onChange={(selected: OptionType) =>
							handleChange('backgroundColor', selected)
						}
						title={'цвет фона'}
					/>
					<Select
						selected={styleForm.contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) =>
							handleChange('contentWidth', selected)
						}
						title={'ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetClick}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleApplyClick}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
