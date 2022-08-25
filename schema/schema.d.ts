// Semver:
// Major (X.x.x): Removed Questions
// Minor (x.X.x): Added Questions
// Patch (x.x.x): Fixed Question Typos or Errors
export type StudySet = {
	schemaVer: '0.1.0';
	ver: [major: number, minor: number, patch: number];
	id: string;
	name: string;
	questions: StudyQuestion[];
};

// Questions must return a score between -1 (bad) and 1 (good). Timing will be multiplied by 2^score.
// A bad response will half the interval, and a good one will double it.
export type StudyQuestion =
	| ShortResponseQuestion
	| MultipleChoiceQuestion
	| OrderingQuestion
	| ListingQuestion
	| Flashcard
	| LinkingQuestion;

// Use levenshtein distance below maxError for autocorrection. Otherwise show prompt. Set maxError to 0 to force correct spelling. (default: 3)
// Map error from answerLen..maxError..0 to -1..0..1 for question error. Capped at -1..1.
type ShortResponseQuestion = {
	type: 'ShortResponseQuestion';
	question: string;
	answer: string;
	maxError?: number;
};

// Correct option is the first one in the set definition always. Options are shuffled on application.
// -1 if incorrect, 1 if correct.
type MultipleChoiceQuestion = {
	type: 'MultipleChoiceQuestion';
	question: string;
	choices: string[];
};

// Items are shuffled and must be put in order.
// 1 if all correct
// -((incorrect-1)/(total-1)) if some are correct
type OrderingQuestion = {
	type: 'OrderingQuestion';
	question: string;
	items: string[];
};

// Items must be listed.
// Minimum of mapped levenshtein distance between items and answer. (default: 3)
type ListingQuestion = {
	type: 'ListingQuestion';
	question: string;
	items: string[];
	maxError?: number;
};

// Flashcard with user-selected correctness.
// 1 if correct, -1 if incorrect.
type Flashcard = {
	type: 'Flashcard';
	question: string;
	answer: string;
};

// Linking question where user must correlate items.
// 1 if all correct
// -((incorrect-1)/(total-1)) if some are correct
type LinkingQuestion = {
	type: 'LinkingQuestion';
	questions: { left: string; right: string }[];
};
