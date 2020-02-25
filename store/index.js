import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

const createStore = () => {
    return new Vuex.Store({
        state: function(){
            return {
                custInfo: '',
                historyInfo: '',
            };
        },
        mutations: {
            /**
             * お客様番号を保存するミューテーション
             * 
             * @param {*} state 
             * @param {*} custNo 
             */
            storeCustInfo: function(state, custInfo){
                state.custInfo = custInfo;
            },
            /**
             * お客様番号を空にするミューテーション
             */
            resetCustNo: function(){
                state.custNo = "";
            },
            /**
             * 取引履歴を保存するミューテーション
             */
            storeHistoryInfo: function(state, historyInfo){
                state.historyInfo = historyInfo;
            }
        },
        plugins: [
            createPersistedState(),
        ],
    });
}

export default createStore