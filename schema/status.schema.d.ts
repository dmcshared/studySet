// User status
export type StatusSchema = {
	sets: {
		[setID: string]: SetStatus;
	};
};

// Remove status after finalDate, always do all questions 24hrs before finalDate.
export type SetStatus = {
	questions: QuestionStatus[];
	finalDate: number; // Unix timestamp (eg. Date.now())
};

export type QuestionStatus = {
	interval: number; // Interval in milliseconds. Defaults to 1000*60*60*24. Question reappears after interval.
	lastStudy: number; // Unix timestamp (Date.now())
};
