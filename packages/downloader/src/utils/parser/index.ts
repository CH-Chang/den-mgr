import {
  type RootParsePackagesFunction,
  type ParsePackagesFunction
} from './share'
import { type Package } from '@dep-mgr/share'
import { LockFile } from '../../constants'
import { readLockFilePath } from '../reader'
import { parsePackages as npmParsePackages } from './npm'
import { parsePackages as pnpmParsePackages } from './pnpm'
import { parsePackages as yarnParsePackages } from './yarn'

const lockFileParsePackagesMap: Record<LockFile, ParsePackagesFunction> = {
  [LockFile.NpmJsonLockFile]: npmParsePackages,
  [LockFile.YarnJsonLockFile]: yarnParsePackages,
  [LockFile.YarnYamlLockFile]: yarnParsePackages,
  [LockFile.PnpmYamlLockFile]: pnpmParsePackages
}

export const parsePackages: RootParsePackagesFunction = (
  lockFile: LockFile
): Package[] => {
  const lockFilePath = readLockFilePath(lockFile)
  const packages = lockFileParsePackagesMap[lockFile](lockFile, lockFilePath)
  return packages
}
