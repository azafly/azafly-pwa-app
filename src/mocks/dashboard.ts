const taskList = [
    {
        text: 'Upload your invoice',
        isCompleted: true
    },
    {
        text: 'Upload your invoice',
        isCompleted: true
    },
    {
        text: 'Task todo now',
        isCompleted: true
    },
    {
        text: 'Upload your invoice',
        isCompleted: false
    },
    {
        text: 'Upload your invoice',
        isCompleted: false
    },
    {
        text: 'More task todo now',
        isCompleted: true
    }
];

const steps = ['Service started', 'Payment Received', 'Payment Sent to Recieving institution', 'Completed'];

export const dashboard = {
    serviceName: 'First Service',
    date: '14-02-2021',
    infoText: `We received your payment.We've processed the payment. We have sent your payments to receiving institution.`,
    taskList,
    steps
};
