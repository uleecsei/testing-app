import Result from '../services/results/Result';

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    tests: test[];
}

interface test{
    _id:  string;
    testId: string;
    result: Result;
}