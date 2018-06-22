#!/usr/bin/env python

'''
extract_platform.py - extract a platform from raw HDF file and write out
'''

import os
import sys
import pandas as pd
from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter

sys.path.append('../lib')
import lib_utils as lutils

if __name__ == '__main__':

    parser = ArgumentParser(description='Extract a platform from HDF file and write out to a smaller HDF file',
                            formatter_class=ArgumentDefaultsHelpFormatter)
    parser.add_argument('--center', help='originating center', type=str, choices=[
                        'GMAO', 'NRL', 'MET', 'MeteoFr', 'JMA_adj', 'JMA_ens', 'EMC'], required=True)
    parser.add_argument(
        '--platform', help='platform to extract and bin', type=str, required=True)
    parser.add_argument('--norm', help='metric norm', type=str,
                        default='dry', choices=['dry', 'moist'], required=False)
    parser.add_argument('--rootdir', help='root path to directory', type=str,
                        default='/scratch3/NCEPDEV/stmp2/Rahul.Mahajan/test/Thomas.Auligne/FSOI', required=False)
    parser.add_argument('--begin_date', help='dataset begin date',
                        type=str, default='2014120100', required=False)
    parser.add_argument('--end_date', help='dataset end date',
                        type=str, default='2015022818', required=False)
    parser.add_argument('--interval', help='dataset interval',
                        type=int, default=6, required=False)

    args = parser.parse_args()

    center = args.center
    rootdir = args.rootdir
    norm = args.norm
    platform = args.platform
    bdate = pd.datetime.strptime(args.begin_date, '%Y%m%d%H')
    edate = pd.datetime.strptime(args.end_date, '%Y%m%d%H')
    interval = args.interval

    search_str = ['PLATFORM="%s"' % (platform)]

    fext = '%s/work/%s/%s/%s.h5' % (rootdir, center, norm, platform.lower())
    if os.path.isfile(fext):
        os.remove(fext)

    for adate in pd.date_range(bdate, edate, freq='%dH' % interval):

        adatestr = adate.strftime('%Y%m%d%H')

        fname = '%s/data/%s/%s.%s.%s.h5' % (rootdir,
                                            center, center, norm, adatestr)
        if not os.path.isfile(fname):
            print '%s : %s does not exist, SKIPPING ...' % (adatestr, fname)
            continue

        df = lutils.readHDF(fname, 'df', where=search_str)

        if platform != df.index.get_level_values('PLATFORM').unique():
            print '%s does not exist in %s' % (platform, fname)
            print 'ABORTING'
            raise

        lutils.writeHDF(fext, 'df', df, complevel=1,
                        complib='zlib', fletcher32=True)

    sys.exit(0)
