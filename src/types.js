//@flow
export type State = {
    message: string
};
export type MapStateToProps<P> = (state:State)=> P;
export type Action = {
    type: 'SET_MESSAGE',
    payload: string
}