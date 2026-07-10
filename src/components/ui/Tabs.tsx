import type { ReactNode } from "react"
import { classNames } from "../../utils/classNames"

export interface TabItem<TValue extends string> {
  label: string
  value: TValue
  content: ReactNode
}

interface TabsProps<TValue extends string> {
  tabs: TabItem<TValue>[]
  value: TValue
  onChange: (value: TValue) => void
}

export function Tabs<TValue extends string>({ onChange, tabs, value }: TabsProps<TValue>) {
  const activeTab = tabs.find((tab) => tab.value === value) ?? tabs[0]

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist">
        {tabs.map((tab) => (
          <button
            aria-selected={tab.value === value}
            className={classNames("tabs__trigger", tab.value === value && "tabs__trigger--active")}
            key={tab.value}
            onClick={() => onChange(tab.value)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs__panel" role="tabpanel">
        {activeTab.content}
      </div>
    </div>
  )
}
