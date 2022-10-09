// Local imports
import { objectifyChannelBanEvent } from '../helpers/objectifyChannelBanEvent.js'
import { objectifyChannelCheerEvent } from '../helpers/objectifyChannelCheerEvent.js'
import { objectifyChannelFollowEvent } from '../helpers/objectifyChannelFollowEvent.js'
import { objectifyChannelGoalBeginEvent } from '../helpers/objectifyChannelGoalBeginEvent.js'
import { objectifyChannelGoalEndEvent } from '../helpers/objectifyChannelGoalEndEvent.js'
import { objectifyChannelGoalProgressEvent } from '../helpers/objectifyChannelGoalProgressEvent.js'
import { objectifyChannelHypeTrainBeginEvent } from '../helpers/objectifyChannelHypeTrainBeginEvent.js'
import { objectifyChannelHypeTrainEndEvent } from '../helpers/objectifyChannelHypeTrainEndEvent.js'
import { objectifyChannelHypeTrainProgressEvent } from '../helpers/objectifyChannelHypeTrainProgressEvent.js'
import { objectifyChannelModeratorEvent } from '../helpers/objectifyChannelModeratorEvent.js'
import { objectifyChannelPollEvent } from '../helpers/objectifyChannelPollEvent.js'
import { objectifyChannelPredictionEvent } from '../helpers/objectifyChannelPredictionEvent.js'
import { objectifyChannelRaidEvent } from '../helpers/objectifyChannelRaidEvent.js'
import { objectifyChannelRedemptionAddEvent } from '../helpers/objectifyChannelRedemptionAddEvent.js'
import { objectifyChannelRedemptionUpdateEvent } from '../helpers/objectifyChannelRedemptionUpdateEvent.js'
import { objectifyChannelRewardEvent } from '../helpers/objectifyChannelRewardEvent.js'
import { objectifyChannelSubscriptionEvent } from '../helpers/objectifyChannelSubscriptionEvent.js'
import { objectifyChannelUnbanEvent } from '../helpers/objectifyChannelUnbanEvent.js'
import { objectifyChannelUpdateEvent } from '../helpers/objectifyChannelUpdateEvent.js'
import { objectifyExtensionBitsTransactionEvent } from '../helpers/objectifyExtensionBitsTransactionEvent.js'
import { objectifyStreamOfflineEvent } from './objectifyStreamOfflineEvent.js'
import { objectifyStreamOnlineEvent } from './objectifyStreamOnlineEvent.js'
import { objectifyUserAuthorisationEvent } from './objectifyUserAuthorisationEvent.js'
import { objectifyUserUpdateEvent } from './objectifyUserUpdateEvent.js'





// Constants
export const OBJECTIFIERS = {
	'channel.ban': objectifyChannelBanEvent,
	'channel.channel_points_custom_reward.add': objectifyChannelRewardEvent,
	'channel.channel_points_custom_reward.update': objectifyChannelRewardEvent,
	'channel.channel_points_custom_reward.remove': objectifyChannelRewardEvent,
	'channel.channel_points_custom_reward_redemption.add': objectifyChannelRedemptionAddEvent,
	'channel.channel_points_custom_reward_redemption.update': objectifyChannelRedemptionUpdateEvent,
	'channel.cheer': objectifyChannelCheerEvent,
	'channel.follow': objectifyChannelFollowEvent,
	'channel.goal.begin': objectifyChannelGoalBeginEvent,
	'channel.goal.end': objectifyChannelGoalEndEvent,
	'channel.goal.progress': objectifyChannelGoalProgressEvent,
	'channel.hype_train.begin': objectifyChannelHypeTrainBeginEvent,
	'channel.hype_train.end': objectifyChannelHypeTrainEndEvent,
	'channel.hype_train.progress': objectifyChannelHypeTrainProgressEvent,
	'channel.moderator.add': objectifyChannelModeratorEvent,
	'channel.moderator.remove': objectifyChannelModeratorEvent,
	'channel.poll.begin': objectifyChannelPollEvent,
	'channel.poll.end': objectifyChannelPollEvent,
	'channel.poll.progress': objectifyChannelPollEvent,
	'channel.prediction.begin': objectifyChannelPredictionEvent,
	'channel.prediction.end': objectifyChannelPredictionEvent,
	'channel.prediction.lock': objectifyChannelPredictionEvent,
	'channel.prediction.progress': objectifyChannelPredictionEvent,
	'channel.raid': objectifyChannelRaidEvent,
	'channel.subscribe': objectifyChannelSubscriptionEvent,
	'channel.subscription.end': objectifyChannelSubscriptionEvent,
	'channel.subscription.gift': objectifyChannelSubscriptionEvent,
	'channel.subscription.message': objectifyChannelSubscriptionEvent,
	'channel.unban': objectifyChannelUnbanEvent,
	'channel.update': objectifyChannelUpdateEvent,
	'extension.bits_transaction.create': objectifyExtensionBitsTransactionEvent,
	'stream.offline': objectifyStreamOfflineEvent,
	'stream.online': objectifyStreamOnlineEvent,
	'user.authorization.grant': objectifyUserAuthorisationEvent,
	'user.authorization.revoke': objectifyUserAuthorisationEvent,
	'user.update': objectifyUserUpdateEvent,

	// Not yet supported
	'channel.charity_campaign.donate': null,
	'drop.entitlement.grant': null,
}
