import axiosConfig from '../utils/axiosConfig';
import { API_BASE_URL } from './config';
const USER_WALLET_ENDPOINT = `${API_BASE_URL}/userWallet`;

const getUserWallet = async () => {
    try {
        const response = await axiosConfig.get(`${USER_WALLET_ENDPOINT}/wallet`);
        return response;
    } catch (error) {
        if (error.response) {
            throw error.response.status;
        } else {
            throw new Error('Network Error');
        }
    }
}

const transferNft = async (transactionHash, toUserEmail, amount) => {
    try {
        const response = await axiosConfig.post(`${USER_WALLET_ENDPOINT}/wallet/transfer`, {
            transactionHash,
            toUserEmail,
            amount
        });
        return response;
    } catch (error) {
        if (error.response) {
            throw error.response.status;
        } else {
            throw new Error('Network Error');
        }
    }
}

const purchaseNft = async (itemId, amount) => {
    try {
        const response = await axiosConfig.post(`${USER_WALLET_ENDPOINT}/wallet/purchase`, {
            itemId,
            amount
        });
        return response;
    } catch (error) {
        if (error.response) {
            throw error.response.status;
        } else {
            throw new Error('Network Error');
        }
    }
}

const UserWalletService = {
    getUserWallet,
    transferNft,
    purchaseNft
}

export default UserWalletService;