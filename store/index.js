import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

const createStore = () => {
    return new Vuex.Store({
        state: function(){
            return {
                custInfo: '',
                historyInfo: '',
                registedCusts: '',
                sendCustNo: '',
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
                console.log('INFO: storeCustInfo実行');
            },
            /**
             * お客様番号を空にするミューテーション
             */
            resetCustNo: function(){
                state.custNo = "";
                console.log('INFO: resetCustNo実行');
            },
            /**
             * 取引履歴を保存するミューテーション
             */
            storeHistoryInfo: function(state, historyInfo){
                state.historyInfo = historyInfo;
                console.log('INFO: storeHistoryInfo実行');
            },

            /**
             * 登録済振込先情報を保存するミューテーション
             */
            storeRegistedCusts: function(state, registedCusts){
                state.registedCusts = registedCusts;
                console.log('INFO: storeRegistedCusts実行');
            },

            /**
             * 振込先お客様番号を保存するミューテーション
             */
            storeSendCustNo: function(state, sendCustNo){
                state.sendCustNo = sendCustNo;
                console.log('INFO: storeSendCustNo実行');
            }

        },
        plugins: [
            createPersistedState(),
        ],
    });
}

export default createStore