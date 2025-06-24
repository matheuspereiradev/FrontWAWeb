import { notification } from 'antd'
import { createContext, JSX, useContext } from 'react'
import { ChildrenProvider } from '../childrenProvider'

type NotificationContextData = {
    openNotification: (type: NotificationType, details: IDetails) => void
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface IDetails {
    message: string;
    description: string;
}

export const NotificationContext = createContext({} as NotificationContextData)

export const NotificationProvider = ({ children }: ChildrenProvider): JSX.Element => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type: NotificationType, details: IDetails) => {
        api[type]({
            message: details.message ?? '',
            description: details.description ?? '',
        });
    };
    return (
        <NotificationContext.Provider value={{ openNotification }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = (): NotificationContextData => useContext(NotificationContext)