from setuptools import setup

setup(
    name='fleetman_server',
    packages=['fleetman_server'],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)
