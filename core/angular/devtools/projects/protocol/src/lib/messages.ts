/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken, InjectOptions, Injector, Type, ViewEncapsulation} from '@angular/core';
import {SingleProvider} from '@angular/core/src/di/provider_collection';

export interface DirectiveType {
  name: string;
  id: number;
}

export interface ComponentType {
  name: string;
  isElement: boolean;
  id: number;
}

export interface DevToolsNode<DirType = DirectiveType, CmpType = ComponentType> {
  element: string;
  directives: DirType[];
  component: CmpType|null;
  children: DevToolsNode<DirType, CmpType>[];
  nativeElement?: Node;
  resolutionPath?: SerializedInjector[];
}

export interface SerializedInjector {
  id: string;
  name: string;
  type: string;
  node?: DevToolsNode;
}

/**
 * Duplicate of the ProviderRecord interface from Angular framework to prevent
 * needing to publically expose the interface from the framework.
 */
export interface ProviderRecord {
  token: Type<unknown>;
  isViewProvider: boolean;
  provider: SingleProvider;
  importPath?: (Injector|Type<unknown>)[];
}

export interface SerializedProviderRecord {
  token: string;
  type: 'type'|'existing'|'class'|'value'|'factory';
  multi: boolean;
  isViewProvider: boolean;
}

/**
 * Duplicate of the InjectedService interface from Angular framework to prevent
 * needing to publically expose the interface from the framework.
 */
export interface InjectedService {
  token?: Type<unknown>|InjectionToken<unknown>;
  value: unknown;
  flags?: InjectOptions;
  providedIn: Injector;
}

export enum PropType {
  Number,
  String,
  Null,
  Undefined,
  Symbol,
  HTMLNode,
  Boolean,
  BigInt,
  Function,
  Object,
  Date,
  Array,
  Set,
  Unknown,
}

export interface Descriptor {
  expandable: boolean;
  value?: any;
  editable: boolean;
  type: PropType;
  preview: string;
}

export interface DirectivesProperties {
  [name: string]: Properties;
}

export interface DirectiveMetadata {
  inputs: {[name: string]: string};
  outputs: {[name: string]: string};
  encapsulation: ViewEncapsulation;
  onPush: boolean;
  dependencies?: SerializedInjectedService[];
}

export interface SerializedInjectedService {
  token: string;
  value: string;
  position: number[];
  flags?: InjectOptions;
  resolutionPath?: any[];
}

export interface Properties {
  props: {[name: string]: Descriptor};
  metadata?: DirectiveMetadata;
}

export type ElementPosition = number[];

export interface DirectivePosition {
  element: ElementPosition;
  directive?: number;
}

export interface NestedProp {
  name: string|number;
  children: NestedProp[];
}

export interface ComponentExplorerViewProperties {
  [directive: string]: NestedProp[];
}

export enum PropertyQueryTypes {
  All,
  Specified,
}

export interface AllPropertiesQuery {
  type: PropertyQueryTypes.All;
}

export interface SelectedPropertiesQuery {
  type: PropertyQueryTypes.Specified;
  properties: ComponentExplorerViewProperties;
}

export type PropertyQuery = AllPropertiesQuery|SelectedPropertiesQuery;

export interface ComponentExplorerViewQuery {
  selectedElement: ElementPosition;
  propertyQuery: PropertyQuery;
}

export interface ComponentExplorerView {
  forest: DevToolsNode[];
  properties?: DirectivesProperties;
}

export interface LifecycleProfile {
  ngOnInit?: number;
  ngOnDestroy?: number;
  ngOnChanges?: number;
  ngDoCheck?: number;
  ngAfterContentInit?: number;
  ngAfterContentChecked?: number;
  ngAfterViewInit?: number;
  ngAfterViewChecked?: number;
}

export interface OutputProfile {
  [outputName: string]: number;
}

export interface DirectiveProfile {
  name: string;
  isElement: boolean;
  isComponent: boolean;
  lifecycle: LifecycleProfile;
  outputs: OutputProfile;
  changeDetection?: number;
}

export interface ElementProfile {
  directives: DirectiveProfile[];
  children: ElementProfile[];
}

export interface ProfilerFrame {
  source: string;
  duration: number;
  directives: ElementProfile[];
}

export interface UpdatedStateData {
  directiveId: DirectivePosition;
  keyPath: string[];
  newValue: any;
}

export interface Route {
  name: string;
  hash: string|null;
  path: string;
  specificity: string|null;
  handler: string;
  data: any;
  children?: Array<Route>;
  isAux: boolean;
}

export type Topic = keyof Events;

export interface InjectorGraphViewQuery {
  directivePosition: DirectivePosition;
  paramIndex: number;
}

export interface Events {
  handshake: () => void;
  shutdown: () => void;
  queryNgAvailability: () => void;
  ngAvailability:
      (config: {version: string|undefined|boolean; devMode: boolean; ivy: boolean}) => void;

  inspectorStart: () => void;
  inspectorEnd: () => void;

  getNestedProperties: (position: DirectivePosition, path: string[]) => void;
  nestedProperties: (position: DirectivePosition, data: Properties, path: string[]) => void;

  setSelectedComponent: (position: ElementPosition) => void;
  getRoutes: () => void;
  updateRouterTree: (routes: Route[]) => void;

  componentTreeDirty: () => void;
  getLatestComponentExplorerView: (query?: ComponentExplorerViewQuery) => void;
  latestComponentExplorerView: (view: ComponentExplorerView) => void;

  updateState: (value: UpdatedStateData) => void;

  startProfiling: () => void;
  stopProfiling: () => void;
  sendProfilerChunk: (results: ProfilerFrame) => void;
  profilerResults: (results: ProfilerFrame) => void;

  createHighlightOverlay: (position: ElementPosition) => void;
  removeHighlightOverlay: () => void;

  highlightComponent: (id: number) => void;
  selectComponent: (id: number) => void;
  removeComponentHighlight: () => void;

  enableTimingAPI: () => void;
  disableTimingAPI: () => void;

  // todo: type properly
  getInjectorProviders: (injector: SerializedInjector) => void;
  latestInjectorProviders:
      (injector: SerializedInjector, providers: SerializedProviderRecord[]) => void;
}