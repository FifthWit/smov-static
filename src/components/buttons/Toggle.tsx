import classNames from "classnames";

export function Toggle(props: { onClick?: () => void; enabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={classNames(
        "w-11 h-6 p-1 rounded-full grid transition-colors duration-100 group/toggle tabbable",
        props.enabled ? "bg-primary" : "bg-input"
      )}
    >
      <div className="relative w-full h-full">
        <div
          className={classNames(
            "scale-90 group-hover/toggle:scale-100 h-full aspect-square rounded-full bg-foreground absolute transition-all duration-100",
            props.enabled ? "left-full transform -translate-x-full" : "left-0",
          )}
        />
      </div>
    </button>
  );
}
