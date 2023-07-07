// Copyright 2017-2023 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from '../types.js';
import type { LinkOption } from './types.js';

import { nodesMadaraPNG } from '../ui/logos/nodes/generated/madaraPNG.js';

export const CUSTOM_ENDPOINT_KEY = 'polkadot-app-custom-endpoints';

interface EnvWindow {
  // eslint-disable-next-line camelcase
  process_env?: {
    WS_URL: string;
  }
}

export function createCustom (t: TFunction): LinkOption[] {
  const WS_URL = (
    (typeof process !== 'undefined' ? process.env?.WS_URL : undefined) ||
    (typeof window !== 'undefined' ? (window as EnvWindow).process_env?.WS_URL : undefined)
  );

  return WS_URL
    ? [
      {
        isHeader: true,
        text: t('rpc.dev.custom', 'Sharingan', { ns: 'apps-config' }),
        textBy: '',
        ui: {
          color: '#000000',
          logo: nodesMadaraPNG
        },
        value: ''
      },
      {
        info: 'WS_URL',
        text: t('rpc.dev.custom.entry', 'sharingan env', { ns: 'apps-config', replace: { WS_URL } }),
        textBy: 'wss://sharingan.madara.zone',
        ui: {
          color: '#000000',
          logo: nodesMadaraPNG
        },
        value: 'wss://sharingan.madara.zone'
      },
      {
        isHeader: true,
        text: t('rpc.dev.custom', 'Rinnegan', { ns: 'apps-config' }),
        textBy: '',
        ui: {
          color: '#000000',
          logo: nodesMadaraPNG
        },
        value: ''
      },
      {
        info: 'WS_URL',
        text: t('rpc.dev.custom.entry', 'rinnegan env', { ns: 'apps-config', replace: { WS_URL } }),
        textBy: 'wss://rinnegan.madara.zone',
        ui: {
          color: '#900000',
          logo: nodesMadaraPNG
        },
        value: 'wss://rinnegan.madara.zone'
      }
    ]
    : [];
}

export function createOwn (t: TFunction): LinkOption[] {
  try {
    // this may not be available, e.g. when running via script
    const storedItems = typeof localStorage === 'object' && typeof localStorage.getItem === 'function'
      ? localStorage.getItem(CUSTOM_ENDPOINT_KEY)
      : null;

    if (storedItems) {
      const items = JSON.parse(storedItems) as string[];

      return items.map((textBy) => ({
        info: 'local',
        text: t('rpc.dev.custom.own', 'Custom', { ns: 'apps-config' }),
        textBy,
        ui: {},
        value: textBy
      }));
    }
  } catch (e) {
    console.error(e);
  }

  return [];
}

export function createDev (t: TFunction): LinkOption[] {
  return [
    {
      dnslink: 'local',
      info: 'local',
      text: t('rpc.dev.local', 'Local Node', { ns: 'apps-config' }),
      textBy: '127.0.0.1:9944',
      ui: {
        color: '#000000',
        logo: nodesMadaraPNG
      },
      value: 'ws://127.0.0.1:9944'
    }
  ];
}
