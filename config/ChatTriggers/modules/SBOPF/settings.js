import { Color } from "../Vigilance";
import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @SliderProperty,
    @DecimalSliderProperty,
    @Vigilant,
} from 'Vigilance';

@Vigilant('SBOPF', 'SkyblockOverhaul', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General', 'Customize'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
})

class Settings {
    constructor() {
        this.initialize(this);
    } 
    @SwitchProperty({
        name: 'Enable Partyfinder',
        description: 'Enables the partyfinder registers',
        category: 'Partyfinder',
    })
    pfEnabled = true;

    @SwitchProperty({
        name: 'Auto Invite',
        description: 'Auto invites players that send you a join request and meet the party requirements',
        category: 'Partyfinder',
    })
    autoInvite = true;
    
    @SwitchProperty({
        name: 'Auto Requeue',
        description: 'Automatically requeues the party after a member leaves',
        category: 'Partyfinder',
    })
    autoRequeue = false;

    @DecimalSliderProperty({
        name: 'Text Scale',
        description: 'Change the size of the text',
        category: 'Customize',
        minF: -2,
        maxF: 2,
        incrementF: 0.1,
    })
    scaleText = 0;

    @SliderProperty({
        name: 'Icon Scale',
        description: 'Change the size of the icons',
        category: 'Customize',
        min: -20,
        max: 20,
        increment: 1,
    })
    scaleIcon = 0;
}


export default new Settings();