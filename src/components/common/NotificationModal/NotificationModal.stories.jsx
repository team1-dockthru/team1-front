import NotificationModal from './NotificationModal';

export default {
  title: 'Molecule/NotificationModal',
  component: NotificationModal,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

const sampleNotifications = [
  {
    id: 1,
    content: "'신청한 챌린지 이름'/'챌린지 이름'에 도전한 작업물에/'챌린지 이름'의 작업물에 작성한 피드백이 수정/삭제되었어요",
    date: "2024.04.01",
  },
  {
    id: 2,
    content: "'신청한 챌린지 이름'이 승인/거절되었어요",
    date: "2024.04.01",
  },
  {
    id: 3,
    content: "'신청한 챌린지 이름'에 작업물이 추가되었어요",
    date: "2024.04.01",
  },
  {
    id: 4,
    content: "'챌린지 이름'에 도전한 작업물에 피드백이 추가되었어요",
    date: "2024.04.01",
  },
  {
    id: 5,
    content: "'신청한 챌린지 이름'이 마감되었어요",
    date: "2024.04.01",
  },
];

const Template = (args) => <NotificationModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  notifications: sampleNotifications,
};

export const Empty = Template.bind({});
Empty.args = {
  notifications: [],
};
