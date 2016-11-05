import { ToolBarButton } from './library.models';

export abstract class ActivityComponent {
    protected activity: ToolBarButton;

    protected setInfoForActivity<T>(param: string, value: T): void {
        if (this.activity) {
            this.activity.customInfo[param] = value;
        }
    }
    protected getInfoFromActivity<T>(param: string, example: T): T {
        return (this.activity) ? this.activity.customInfo[param] : example;
    }
}
