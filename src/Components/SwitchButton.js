import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchButton() {
    return (
        <div className="inline-flex items-center gap-1">
            <Switch
                id="switch-02"
                className="h-4 w-8 [&_span]:size-2 [&_span]:data-[state=checked]:translate-x-3 rtl:[&_span]:data-[state=checked]:-translate-x-3"
            />
            <Label htmlFor="switch-02" className="sr-only">
                Small switch
            </Label>
        </div>
    );
}

